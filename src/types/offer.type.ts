import { User } from './user.type';
import { Location } from './location.type';

export type Offer = {
  title: string;
  description: string;
  date: string;
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
  goods: string[];
  user: User;
  location: Location;
}
