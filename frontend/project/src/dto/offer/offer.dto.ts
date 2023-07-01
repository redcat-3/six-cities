import { UserType } from '../../const';

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

export type User = {
  name: string;
  email: string;
  avatar: string;
  userType: UserType;
};

export default class OfferDto {
  public id!: string;

  public title!: string;

  public description!: string;

  public city!: string;

  public previewImage!: string;

  public images!: string[];

  public isPremium!: boolean;

  public isFavorite!: boolean;

  public rating!: number;

  public type!: RentType;

  public roomsNumber!: number;

  public guestsNumber!: number;

  public price!: number;

  public features!: FeatureType[];

  public user!: User;

  public latitude!: number;

  public longitude!: number;
}
