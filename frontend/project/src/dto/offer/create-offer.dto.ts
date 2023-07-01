import { User } from './offer.dto';

export enum FeatureType {
  Breakfast = 'Breakfast',
  AirConditioning = 'Air conditioning',
  LaptopFriendly = 'Laptop friendly workspace',
  BabySeat = 'Baby seat',
  Washer = 'Washer',
  Towels = 'Towels',
  Fridge = 'Fridge'
}

export enum RentType {
  APARTMENT = 'apartment',
  HOUSE = 'house',
  ROOM = 'room',
  HOTEL = 'hotel'
}

export enum CityNames {
  PARIS = 'Paris',
  COLOGNE = 'Cologne',
  BRUSSELS = 'Brussels',
  AMSTERDAM = 'Amsterdam',
  HAMBURG = 'Hamburg',
  DUSSELDORF = 'Dusseldorf'
}

export default class CreateOfferDto {
  public id!: string;

  public title!: string;

  public description!: string;

  public city!:	CityNames;

  public images!: string[];

  public isPremium!: boolean;

  public isFavorite!: boolean;

  public previewImage!: string;

  public type!: RentType;

  public roomsNumber!: number;

  public rating!: number;

  public guestNumber!: number;

  public price!: number;

  public features!: FeatureType[];

  public userId!: User;

  public latitude!: number;

  public longitude!: number;

  public commentCount!: number;
}
