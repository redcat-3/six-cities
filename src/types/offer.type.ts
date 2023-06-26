import { CityNames } from './city-names.enum';
import { FeatureType } from './feature-type.enum';
import { RentType } from './rent-type.enum';
import { User } from './user.type';

export type Offer = {
  title: string;
  description: string;
  city:	CityNames;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  type: RentType;
  roomsNumber: number;
  gestNumber: number;
  price: number;
  features: FeatureType[];
  user: User;
  latitude: number;
  longitude: number;
}
