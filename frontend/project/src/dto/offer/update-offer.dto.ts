import { User } from './offer.dto';

export enum RentType {
  APARTMENT = 'apartment',
  HOUSE = 'house',
  ROOM = 'room',
  HOTEL = 'hotel'
}

export enum FeatureType {
  Breakfast = 'Breakfast',
  AirConditioning = 'Air conditioning',
  LaptopFriendly = 'Laptop friendly workspace',
  BabySeat = 'Baby seat',
  Washer = 'Washer',
  Towels = 'Towels',
  Fridge = 'Fridge'
}

export enum CityNames {
  PARIS = 'Paris',
  COLOGNE = 'Cologne',
  BRUSSELS = 'Brussels',
  AMSTERDAM = 'Amsterdam',
  HAMBURG = 'Hamburg',
  DUSSELDORF = 'Dusseldorf'
}

export default class UpdateOfferDto {
  public title!: string;

  public description!: string;

  public postDate!: string;

  public city!:	string;

  public previewImage!: string;

  public images!: string[];

  public isPremium!: boolean;

  public type!: RentType;

  public roomsNumber!: number;

  public gestNumber!: number;

  public price!: number;

  public features!: FeatureType[];

  public userId!: User;

  public latitude!: number;

  public longitude!: number;
}
