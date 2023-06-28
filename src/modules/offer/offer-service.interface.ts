import { DocumentType } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import UpdateOfferDto from './dto/update-offer.dto.js';

export interface OfferServiceInterface {
  createOffer(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;

  findById(offerId: string, userAuthId?: string): Promise<DocumentType<OfferEntity> | null>;

  updateByOfferId(
    offerId: string,
    dto: UpdateOfferDto
  ): Promise<DocumentType<OfferEntity> | null>;

  deleteByOfferId(offerId: string): Promise<DocumentType<OfferEntity> | null>;

  find(
    userAuthId?: string,
    count?: number
  ): Promise<DocumentType<OfferEntity>[] | null>;

  findPremiumOffers(
    cityName: string,
    userAuthId?: string
  ): Promise<DocumentType<OfferEntity>[] | null>;

  addFavorite(
    userId: string,
    offerId: string
  ): Promise<DocumentType<OfferEntity> | null>;

  removeFavorite(
    userId: string,
    offerId: string
  ): Promise<DocumentType<OfferEntity> | null>;

  findFavoritesByUserId(
    userId: string
  ): Promise<DocumentType<OfferEntity>[] | null>;

  addComment(offerId: string, newRating: number): Promise<DocumentType<OfferEntity> | null>;

  exists(documentId: string): Promise<boolean>
}
