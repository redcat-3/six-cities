import { inject, injectable } from 'inversify';
import CreateOfferDto from './dto/create-offer.dto.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { OfferServiceInterface } from './offer-service.interface.js';
import { SortType } from '../../types/sort-type.enum.js';
import UpdateOfferDto from './dto/update-offer.dto.js';
import { DEFAULT_OFFER_COUNT, DEFAULT_PREMIUM_COUNT, RETURNABLE_FIELDS } from './offer.constant.js';
import { Types } from 'mongoose';
import { UserServiceInterface } from '../user/user-service.interface.js';

@injectable()
export default class OfferService implements OfferServiceInterface {
  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponent.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
    @inject(AppComponent.UserServiceInterface) private readonly userService: UserServiceInterface
  ) {}

  public async createOffer(
    dto: CreateOfferDto
  ): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async findById(
    offerId: string,
    userAuthId?: string
  ): Promise<DocumentType<OfferEntity> | null> {
    if (userAuthId) {
      const user = await this.userService.findById(userAuthId);

      if (!user) {
        return null;
      }

      return this.offerModel
        .findById(offerId)
        .aggregate([
          {
            $set: {
              isFavorite: {
                $cond: [{ $in: ['$_id', [...user.favoriteOffers]] }, true, false],
              },
            },
          },
          { $set: { id: { $toString: '$_id' } } },
          { $sort: { postDate: SortType.Down } },
          {
            $lookup: {
              from: 'users',
              localField: 'userId',
              foreignField: '_id',
              as: 'user',
            },
          },
          {
            $unwind: {
              path: '$user',
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $project: RETURNABLE_FIELDS,
          },
        ])
        .exec();
    }
    return this.offerModel.findById(offerId).populate(['userId']).exec();
  }

  public async updateByOfferId(
    offerId: string,
    dto: UpdateOfferDto
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, { dto }, { new: true })
      .populate(['userId'])
      .exec();
  }

  public async deleteByOfferId(
    offerId: string
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndDelete(offerId).exec();
  }

  public async find(
    userAuthId?: string,
    count?: number
  ): Promise<DocumentType<OfferEntity>[] | null> {
    const limit = count ?? DEFAULT_OFFER_COUNT;

    if (userAuthId) {
      const user = await this.userService.findById(userAuthId);

      if (!user) {
        return null;
      }

      return this.offerModel
        .aggregate([
          {
            $set: {
              isFavorite: {
                $cond: [{ $in: ['$_id', [...user.favoriteOffers]] }, true, false],
              },
            },
          },
          { $set: { id: { $toString: '$_id' } } },
          { $sort: { postDate: SortType.Down } },
          { $limit: +limit },
          {
            $lookup: {
              from: 'users',
              localField: 'userId',
              foreignField: '_id',
              as: 'user',
            },
          },
          {
            $unwind: {
              path: '$user',
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $project: RETURNABLE_FIELDS,
          },
        ])
        .exec();
    }
    return this.offerModel
      .aggregate([
        { $addFields: { id: { $toString: '$_id' } } },
        { $sort: { postDate: SortType.Down } },
        { $limit: +limit },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'user',
          },
        },
        {
          $unwind: {
            path: '$user',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: RETURNABLE_FIELDS,
        },
      ])
      .exec();
  }

  public async addFavorite(
    userId: string,
    offerId: string
  ): Promise<DocumentType<OfferEntity> | null> {
    await this.userService.addToFavoriteById(userId, offerId);

    return this.offerModel
      .findByIdAndUpdate(offerId, { $set: { isFavorite: true } })
      .populate(['userId'])
      .exec();
  }

  public async removeFavorite(
    userId: string,
    offerId: string
  ): Promise<DocumentType<OfferEntity> | null> {
    await this.userService.removeFromFavoritesById(userId, offerId);
    return this.offerModel.findById(offerId).populate(['userId']).exec();
  }

  public async findFavorite(favoriteList:string[]):Promise<DocumentType<OfferEntity>[]| null>{
    const ids = favoriteList.map((item)=>new Types.ObjectId(item));
    return await this.offerModel
      .find({ _id:{$in: ids } })
      .sort({ createdAt: SortType.Down })
      .populate(['userId'])
      .exec();
  }

  public async findPremiumOffers(
    cityName: string,
    userAuthId?: string
  ): Promise<DocumentType<OfferEntity>[] | null> {
    if (userAuthId) {
      const user = await this.userService.findById(userAuthId);

      if (!user) {
        return null;
      }

      return this.offerModel
        .aggregate([
          { $match: { isPremium: true, city: cityName } },
          {
            $set: {
              isFavorite: {
                $cond: [{ $in: ['$_id', [...user.favoriteOffers]] }, true, false],
              },
            },
          },
          { $set: { id: { $toString: '$_id' } } },
          { $sort: { postDate: SortType.Down } },
          { $limit: DEFAULT_PREMIUM_COUNT },
          {
            $lookup: {
              from: 'users',
              localField: 'userId',
              foreignField: '_id',
              as: 'user',
            },
          },
          {
            $unwind: {
              path: '$user',
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $project: RETURNABLE_FIELDS,
          },
        ])
        .exec();
    }

    return this.offerModel
      .aggregate([
        { $match: { isPremium: true, city: cityName } },
        { $addFields: { id: { $toString: '$_id' } } },
        { $sort: { postDate: SortType.Down } },
        { $limit: DEFAULT_PREMIUM_COUNT },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'user',
          },
        },
        {
          $unwind: {
            path: '$user',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: RETURNABLE_FIELDS,
        },
      ])
      .exec();
  }

  public async findFavoritesByUserId(
    userId: string
  ): Promise<DocumentType<OfferEntity>[] | null> {
    const user = await this.userService.findById(userId);

    if (!user) {
      return null;
    }

    return this.offerModel
      .aggregate([
        {
          $match: {
            _id: {
              $in: [...user.favoriteOffers],
            },
          },
        },
        { $set: { isFavorite: true } },
        { $project: RETURNABLE_FIELDS },
        { $addFields: { id: { $toString: '$_id' } } },
      ])
      .exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel
      .exists({_id: documentId})) !== null;
  }

  public async addComment(offerId: string, newRating: number): Promise<DocumentType<OfferEntity> | null> {
    const currentOffer = await this.offerModel.findById(offerId);
    if (!currentOffer) {
      return null;
    }
    return this.offerModel
      .findByIdAndUpdate(
        offerId,
        {
          '$inc': { commentCount: 1 },
          '$set': { rating: ((currentOffer.rating + newRating) / (currentOffer.commentCount + 1)).toFixed(1)}
        },
        {new: true})
      .exec();
  }
}
