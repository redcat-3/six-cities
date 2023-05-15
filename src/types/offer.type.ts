import { User } from './user.type';
import { Location } from './location.type';

export type Offer = {
  id: number;
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
  bedrooms: number;
  maxAdults: number;
  price: number;
  features: string[];
  host: Omit<User, 'password' | 'email'>;
  location: Omit<Location, 'zoom'>;
}
