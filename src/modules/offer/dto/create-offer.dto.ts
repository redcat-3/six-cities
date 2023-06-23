import { OfferType } from '../../../types/rent-type.enum.js';
import { IsEnum, IsInt, IsBoolean, Max, MaxLength, Min, MinLength, IsLatitude, IsLongitude } from 'class-validator';
import { City } from '../../../types/city-names.enum.js';
import { MIN_LENGHT, Title, Description, RoomsNumber, AdultsNumber, Price } from '../offer.constant.js';
import { FeatureType } from '../../../types/feature-type.enum.js';

export default class CreateOfferDto {
  @MinLength(Title.Min, {message: `Minimum title length must be ${Title.Min}`})
  @MaxLength(Title.Max, {message: `Maximum title length must be ${Title.Max}`})
  public title!: string;

  @MinLength(Description.Min, {message: `Minimum title length must be ${Description.Min}`})
  @MaxLength(Description.Max, {message: `Maximum title length must be ${Description.Max}`})
  public description!: string;

  @IsEnum(City, {message: 'type must be Paris, or Cologne, or Brussels, or Amsterdam, or Hamburg, or Dusseldorf'})
  public city!:	City;

  @MaxLength(MIN_LENGHT, {message: 'Too short for field «image»'})
  public previewImage!: string;

  @MaxLength(MIN_LENGHT, {message: 'Too short for field «image»', each: true})
  public images!: string[];

  @IsBoolean({message: 'Field isPremium must be boolean'})
  public isPremium!: boolean;

  @IsEnum(OfferType, {message: 'type must be OfferType'})
  public type!: OfferType;

  @IsInt({message: 'BedroomsNumber must be an integer'})
  @Min(RoomsNumber.Min, {message: `Minimum bedroomsNumber is ${RoomsNumber.Min}`})
  @Max(RoomsNumber.Max, {message: `Maximum bedroomsNumber is ${RoomsNumber.Min}`})
  public bedroomsNumber!: number;

  @IsInt({message: 'MaxAdultsNumber must be an integer'})
  @Min(AdultsNumber.Min, {message: `Minimum bedroomsNumber is  ${AdultsNumber.Min}`})
  @Max(AdultsNumber.Max, {message: `Maximum bedroomsNumber is ${AdultsNumber.Min}`})
  public maxAdultsNumber!: number;

  @IsInt({message: 'Price must be an integer'})
  @Min(Price.Min, {message: `Minimum price is ${Price.Min}`})
  @Max(Price.Max, {message: `Maximum price is ${Price.Min}`})
  public price!: number;

  @IsEnum(FeatureType, {message: 'type must be FeatureType', each: true})
  public features!: FeatureType[];

  public hostId!: string;

  @IsLatitude({message: 'Latitude count must be a valid latitude coordinate'})
  public latitude!: number;

  @IsLongitude({message: 'Longitude count must be a valid longitude coordinate'})
  public longitude!: number;
}
