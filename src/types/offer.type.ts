import { OfferType } from './offer-type.enum';
import { User } from './user.type';

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city:	string;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: OfferType;
  bedroomsNumber: number;
  maxAdultsNumber: number;
  price: number;
  features: string[];
  host: User;
  latitude: number;
  longitude: number;
}
