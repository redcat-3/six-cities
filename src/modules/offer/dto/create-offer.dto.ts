import { OfferType } from '../../../types/offer-type.enum.js';
import { IsArray, IsEnum, IsInt, IsMongoId, IsBoolean, Max, MaxLength, Min, MinLength, IsLatitude, IsLongitude } from 'class-validator';
import { City } from '../../../types/city.enum.js';
import { MIN_LENGHT, Title, Description, RoomsNumber, AdultsNumber, Price } from '../offer.constant.js';

export default class CreateOfferDto {
  @MinLength(Title.Min, {message: 'Minimum title length must be $Title.Min'})
  @MaxLength(Title.Max, {message: 'Maximum title length must be $Title.Max'})
  public title!: string;

  @MinLength(Description.Min, {message: 'Minimum title length must be $Description.Min'})
  @MaxLength(Description.Max, {message: 'Maximum title length must be $Description.Max'})
  public description!: string;

  @IsEnum(City, {message: 'type must be Paris, or Cologne, or Brussels, or Amsterdam, or Hamburg, or Dusseldorf'})
  public city!:	string;

  @MaxLength(MIN_LENGHT, {message: 'Too short for field «image»'})
  public previewImage!: string;

  @IsArray({message: 'Field images must be an array'})
  public images!: string[];

  @IsBoolean({message: 'Field isPremium must be boolean'})
  public isPremium!: boolean;

  @IsBoolean({message: 'Field isFavorite must be boolean'})
  public isFavorite!: boolean;

  @IsEnum(OfferType, {message: 'type must be &OfferType'})
  public type!: OfferType;

  @IsInt({message: 'BedroomsNumber must be an integer'})
  @Min(RoomsNumber.Min, {message: 'Minimum bedroomsNumber is $RoomsNumber.Min'})
  @Max(RoomsNumber.Max, {message: 'Maximum bedroomsNumber is $RoomsNumber.Max'})
  public bedroomsNumber!: number;

  @IsInt({message: 'MaxAdultsNumber must be an integer'})
  @Min(AdultsNumber.Min, {message: 'Minimum bedroomsNumber is $AdultsNumber.Min'})
  @Max(AdultsNumber.Max, {message: 'Maximum bedroomsNumber is $AdultsNumber.Max'})
  public maxAdultsNumber!: number;

  @IsInt({message: 'Price must be an integer'})
  @Min(Price.Min, {message: 'Minimum price is $Price.Min'})
  @Max(Price.Max, {message: 'Maximum price is $Price.Max'})
  public price!: number;

  @IsArray({message: 'Field features must be an array'})
  public features!: string[];

  @IsMongoId({message: 'hostId field must be valid an id'})
  public hostId!: string;

  @IsLatitude({message: 'Latitude count must be a valid latitude coordinate'})
  public latitude!: number;

  @IsLongitude({message: 'Longitude count must be a valid longitude coordinate'})
  public longitude!: number;
}
