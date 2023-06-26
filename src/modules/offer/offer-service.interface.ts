import { DocumentType } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import UpdateOfferDto from './dto/update-offer.dto.js';

export interface OfferServiceInterface {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  find(userId?: string, count?: number): Promise<DocumentType<OfferEntity>[]>;
  findById(offerId: string, userId?: string): Promise<DocumentType<OfferEntity> | null>
  findPremiumOffers(city: string, count?: number): Promise<DocumentType<OfferEntity>[]>;
  findFavorite(favoriteList:string[]):Promise<DocumentType<OfferEntity>[]| null>;
  addComment(offerId: string, newRating: number): Promise<DocumentType<OfferEntity> | null>;
  exists(documentId: string): Promise<boolean>;
}
