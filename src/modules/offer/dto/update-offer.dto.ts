import {OfferType} from '../../../types/rent-type.enum.js';
import { IsArray, IsDateString, IsEnum, IsInt, IsMongoId, IsBoolean, Max, MaxLength, Min, MinLength, IsOptional } from 'class-validator';
import {MIN_LENGHT, Title, Description, RoomsNumber, AdultsNumber, Price, Latitude, Longitude } from '../offer.constant.js';
import { City } from '../../../types/city-names.enum.js';
import { FeatureType } from '../../../types/feature-type.enum.js';

export default class UpdateOfferDto {
  @IsOptional()
  @MinLength(Title.Min, {message: `Minimum title length must be ${Title.Min}`})
  @MaxLength(Title.Max, {message: `Maximum title length must be ${Title.Max}`})
  public title!: string;

  @IsOptional()
  @MinLength(Description.Min, {message: `Minimum title length must be ${Description.Min}`})
  @MaxLength(Description.Max, {message: `Maximum title length must be ${Description.Max}`})
  public description!: string;

  @IsOptional()
  @IsDateString({}, {message: 'postDate must be valid ISO date'})
  public postDate!: Date;

  @IsOptional()
  @IsEnum(City, {message: 'type must be Paris, or Cologne, or Brussels, or Amsterdam, or Hamburg, or Dusseldorf'})
  public city!:	string;

  @IsOptional()
  @MaxLength(MIN_LENGHT, {message: 'Too short for field «image»'})
  public previewImage!: string;

  @IsOptional()
  @IsArray({message: 'Field images must be an array'})
  @MaxLength(MIN_LENGHT, {message: 'Too short for field «image»'})
  public images!: string[];

  @IsOptional()
  @IsBoolean({message: 'Field isPremium must be boolean'})
  public isPremium!: boolean;

  @IsOptional()
  @IsEnum(OfferType, {message: 'type must be &OfferType'})
  public type!: OfferType;

  @IsOptional()
  @IsInt({message: 'BedroomsNumber must be an integer'})
  @Min(RoomsNumber.Min, {message: 'Minimum bedroomsNumber is $RoomsNumber.Min'})
  @Max(RoomsNumber.Max, {message: 'Maximum bedroomsNumber is $RoomsNumber.Max'})
  public bedroomsNumber!: number;

  @IsOptional()
  @IsInt({message: 'MaxAdultsNumber must be an integer'})
  @Min(AdultsNumber.Min, {message: 'Minimum bedroomsNumber is $AdultsNumber.Min'})
  @Max(AdultsNumber.Max, {message: 'Maximum bedroomsNumber is $AdultsNumber.Max'})
  public maxAdultsNumber!: number;

  @IsOptional()
  @IsInt({message: 'Price must be an integer'})
  @Min(Price.Min, {message: 'Minimum price is $Price.Min'})
  @Max(Price.Max, {message: 'Maximum price is $Price.Max'})
  public price!: number;

  @IsOptional()
  @IsArray({message: 'Field features must be an array'})
  @IsEnum({each: FeatureType, message: 'Features field must be an array of valid values'})
  public features!: string[];

  @IsOptional()
  @IsMongoId({message: 'hostId field must be valid an id'})
  public hostId!: string;

  @IsOptional()
  @IsInt({message: 'Comment count must be an integer'})
  public commentCount!: number;

  @IsOptional()
  @IsInt({message: 'Latitude count must be an integer'})
  @Min(Latitude.Min, {message: 'Minimum rating is $Latitude.Min'})
  @Max(Latitude.Max, {message: 'Maximum rating is $Latitude.Max'})
  public latitude!: number;

  @IsOptional()
  @IsInt({message: 'Longitude count must be an integer'})
  @Min(Longitude.Min, {message: 'Minimum rating is $Longitude.Min'})
  @Max(Longitude.Max, {message: 'Maximum rating is $Longitude.Max'})
  public longitude!: number;
}
