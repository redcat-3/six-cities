import { OfferType } from '../../../types/offer-type.enum.js';
import { IsEnum, IsInt, IsMongoId, IsBoolean, Max, MaxLength, Min, MinLength, IsLatitude, IsLongitude } from 'class-validator';
import { City } from '../../../types/city.enum.js';
import { MIN_LENGHT, Title, Description, RoomsNumber, AdultsNumber, Price } from '../offer.constant.js';
import { FeatureType } from '../../../types/feature-type.enum.js';

export default class CreateOfferDto {
  @MinLength(Title.Min, {message: 'Minimum title length must be $constraint1'})
  @MaxLength(Title.Max, {message: 'Maximum title length must be $constraint1'})
  public title!: string;

  @MinLength(Description.Min, {message: 'Minimum title length must be $constraint1'})
  @MaxLength(Description.Max, {message: 'Maximum title length must be $constraint1'})
  public description!: string;

  @IsEnum(City, {message: 'type must be Paris, or Cologne, or Brussels, or Amsterdam, or Hamburg, or Dusseldorf'})
  public city!:	string;

  @MaxLength(MIN_LENGHT, {message: 'Too short for field «image»'})
  public previewImage!: string;

  @MaxLength(MIN_LENGHT, {message: 'Too short for field «image»', each: true})
  public images!: string[];

  @IsBoolean({message: 'Field isPremium must be boolean'})
  public isPremium!: boolean;

  @IsBoolean({message: 'Field isFavorite must be boolean'})
  public isFavorite!: boolean;

  @IsEnum(OfferType, {message: 'type must be &OfferType'})
  public type!: OfferType;

  @IsInt({message: 'BedroomsNumber must be an integer'})
  @Min(RoomsNumber.Min, {message: 'Minimum bedroomsNumber is $constraint1'})
  @Max(RoomsNumber.Max, {message: 'Maximum bedroomsNumber is $constraint1'})
  public bedroomsNumber!: number;

  @IsInt({message: 'MaxAdultsNumber must be an integer'})
  @Min(AdultsNumber.Min, {message: 'Minimum bedroomsNumber is $constraint1'})
  @Max(AdultsNumber.Max, {message: 'Maximum bedroomsNumber is $constraint1'})
  public maxAdultsNumber!: number;

  @IsInt({message: 'Price must be an integer'})
  @Min(Price.Min, {message: 'Minimum price is $constraint1'})
  @Max(Price.Max, {message: 'Maximum price is $constraint1'})
  public price!: number;

  @IsEnum(FeatureType, {message: 'type must be &OfferType', each: true})
  public features!: FeatureType[];

  @IsMongoId({message: 'hostId field must be valid an id'})
  public hostId!: string;

  @IsLatitude({message: 'Latitude count must be a valid latitude coordinate'})
  public latitude!: number;

  @IsLongitude({message: 'Longitude count must be a valid longitude coordinate'})
  public longitude!: number;
}
