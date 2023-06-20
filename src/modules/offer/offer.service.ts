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

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findOne({offerId})
      .populate(['hostId'])
      .exec();
  }

  public async find(): Promise<DocumentType<OfferEntity>[]>{
    return this.offerModel
      .find()
      .sort({createdAt: SortType.Down})
      .populate(['hostId'])
      .exec();
  }

  public async findMany(offerIds: () => string[]): Promise<DocumentType<OfferEntity>[]>{
    return this.offerModel
      .find({
        _id: {$in: offerIds }
      })
      .sort({createdAt: SortType.Down})
      .populate(['hostId'])
      .exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .populate(['hostId'])
      .exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel
      .exists({_id: documentId})) !== null;
  }

  public async findByUserId(userId: string, count?: number): Promise<DocumentType<OfferEntity>[]> {
    const limit = count ?? DEFAULT_OFFER_COUNT;
    return this.offerModel
      .find({users: userId}, {}, {limit})
      .populate(['hostId'])
      .exec();
  }

  public async findPremiumOffers(): Promise<DocumentType<OfferEntity>[]> {
    const limit = DEFAULT_PREMIUM_COUNT;

    return this.offerModel
      .find({isPremium: true}, {}, {limit})
      .sort({createdAt: SortType.Down})
      .populate(['hostId'])
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
