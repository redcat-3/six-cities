import { inject, injectable } from 'inversify';
import CreateOfferDto from './dto/create-offer.dto.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { OfferServiceInterface } from './offer-service.interface.js';
import { SortType } from '../../types/sort-type.enum.js';
import UpdateOfferDto from './dto/update-offer.dto.js';
import { DEFAULT_OFFER_COUNT, DEFAULT_PREMIUM_COUNT } from './offer.constant.js';
import { Types } from 'mongoose';

@injectable()
export default class OfferService implements OfferServiceInterface {
  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponent.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);
    return result;
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .populate(['userId'])
      .exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async findById(offerId: string, userId?: string): Promise<DocumentType<OfferEntity> | null> {
    this.offerModel.aggregate([
      { $match: { $expr: { $eq: [offerId, { $toString: '$_id'}] } } },
      {
        $lookup: {
          from: 'users',
          pipeline: [
            { $match: { $expr: {$eq: [userId, { $toString: '$_id'}] } } },
            { $project: {_id: false, favorites: true}}
          ],
          as: 'user'
        }
      },
      { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },
      { $addFields: {
        isFavorite: {
          $cond:
            [
              {$and:
                [
                  {$ne: [{ $type: '$user.favorites'}, 'missing']},
                  {$in: ['$_id', '$user.favorites']}
                ]
              },
              true,
              false
            ]
        }
      }
      },
      { $unset: 'comments' },
    ]);
    return this.offerModel
      .findOne({offerId})
      .populate(['userId'])
      .exec();
  }

  public async find(userId?: string, count?: number): Promise<DocumentType<OfferEntity>[]>{
    const limit = count ?? DEFAULT_OFFER_COUNT;
    const query = userId ? {users: userId} : {};

    this.offerModel.aggregate([
      {
        $lookup: {
          from: 'users',
          pipeline: [
            { $match: { $expr: {$eq: [userId, { $toString: '$_id'}] } } },
            { $project: {_id: false, favorites: true}}
          ],
          as: 'user'
        }
      },
      { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },
      { $addFields: {
        isFavorite: {
          $cond:
            [
              {$and:
                [
                  {$ne: [{ $type: '$user.favorites'}, 'missing']},
                  {$in: ['$_id', '$user.favorites']}
                ]
              },
              true,
              false
            ]
        }
      }
      },
      { $unset: 'users' },
    ]).exec();

    return this.offerModel
      .find(query, {}, {limit})
      .sort({createdAt: SortType.Down})
      .populate(['userId'])
      .exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel
      .exists({_id: documentId})) !== null;
  }

  public async findPremiumOffers(city: string, count?: number): Promise<DocumentType<OfferEntity>[]> {
    const limit = count ? count : DEFAULT_PREMIUM_COUNT;

    return this.offerModel
      .find({isPremium: true, city: city}, {}, {limit})
      .sort({createdAt: SortType.Down})
      .populate(['userId'])
      .exec();
  }

  public async findFavorite(favoriteList:string[]):Promise<DocumentType<OfferEntity>[]| null>{
    const ids = favoriteList.map((item)=>new Types.ObjectId(item));
    return await this.offerModel
      .find({_id:{$in: ids }})
      .sort({createdAt: SortType.Down})
      .populate(['userId', 'locationId'])
      .exec();
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
