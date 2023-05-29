import { User } from './user.type';
import { Location } from './location.type';

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
  type: string;
  bedroomsNumber: number;
  maxAdultsNumber: number;
  price: number;
  features: string[];
  host: User;
  location: Omit<Location, 'zoom'>;
}
