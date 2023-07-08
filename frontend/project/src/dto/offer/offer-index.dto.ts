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


export default class OfferIndexDto {
  public id!: string;

  public title!: string;

  public description!: string;

  public cityName!: CityNames;

  public previewImage!: string;

  public isFavorite!: boolean;

  public rating!: number;

  public type!: RentType;

  public price!: number;
}
