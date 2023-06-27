import { RentType } from '../../../types/rent-type.enum.js';
import { IsArray, IsDateString, IsEnum, IsInt, IsMongoId, IsBoolean, Max, MaxLength, Min, MinLength, IsOptional, IsNotEmpty, IsUrl, ValidateNested, ArrayMinSize, IsLatitude, IsLongitude } from 'class-validator';
import { MIN_TITLE_LENGHT, MAX_TITLE_LENGHT, MIN_DESC_LENGHT, MAX_DESC_LENGHT, COUNT_OF_IMAGES, MIN_ROOMS_NUMBER, MAX_ROOMS_NUMBER, MIN_GEST_NUMBER, MAX_GEST_NUMBER, MAX_PRICE, MIN_PRICE } from '../offer.constant.js';
import { CityNames } from '../../../types/city-names.enum.js';
import { FeatureType } from '../../../types/feature-type.enum.js';

export default class UpdateOfferDto {
  @IsOptional()
  @MinLength(MIN_TITLE_LENGHT, {message: `Minimum title length must be ${MIN_TITLE_LENGHT}`})
  @MaxLength(MAX_TITLE_LENGHT, {message: `Maximum title length must be ${MAX_TITLE_LENGHT}`})
  public title?: string;

  @IsOptional()
  @MinLength(MIN_DESC_LENGHT, {message: `Minimum title length must be ${MIN_DESC_LENGHT}`})
  @MaxLength(MAX_DESC_LENGHT, {message: `Maximum title length must be ${MAX_DESC_LENGHT}`})
  public description?: string;

  @IsOptional()
  @IsDateString({}, {message: 'postDate must be valid ISO date'})
  public postDate?: Date;

  @IsOptional()
  @IsEnum(CityNames, {message: `type must be  ${Object.values(RentType)}`})
  public city?:	string;

  @IsOptional()
  @IsNotEmpty({message: 'Preview image is required'})
  @IsUrl()
  public previewImage?: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @ArrayMinSize(COUNT_OF_IMAGES, {message: `Count of image must be ${COUNT_OF_IMAGES}`})
  @IsUrl()
  public images?: string[];

  @IsOptional()
  @IsBoolean({message: 'Field isPremium must be boolean'})
  public isPremium?: boolean;

  @IsOptional()
  @IsEnum(RentType, {message: `type must be ${Object.values(RentType)}`})
  public type?: RentType;

  @IsOptional()
  @IsInt({message: 'BedroomsNumber must be an integer'})
  @Min(MIN_ROOMS_NUMBER, {message: `Minimum roomsNumber is ${MIN_ROOMS_NUMBER}`})
  @Max(MAX_ROOMS_NUMBER, {message: `Maximum roomsNumber is ${MAX_ROOMS_NUMBER}`})
  public roomsNumber?: number;

  @IsOptional()
  @IsInt({message: 'GestNumber must be an integer'})
  @Min(MIN_GEST_NUMBER, {message: `Minimum gestNumber is  ${MIN_GEST_NUMBER}`})
  @Max(MAX_GEST_NUMBER, {message: `Maximum gestNumber is ${MAX_GEST_NUMBER}`})
  public gestNumber?: number;

  @IsOptional()
  @IsInt({message: 'Price must be an integer'})
  @Min(MIN_PRICE, {message: `Minimum price is ${MIN_PRICE}`})
  @Max(MAX_PRICE, {message: `Maximum price is ${MAX_PRICE}`})
  public price?: number;

  @IsOptional()
  @IsArray({message: 'Field features must be an array'})
  @IsEnum(FeatureType, { each: true, message: `Features values must be in ${Object.values(FeatureType)}` })
  public features?: string[];

  @IsOptional()
  @IsMongoId({message: 'userId field must be valid an id'})
  public userId?: string;

  @IsOptional()
  @IsInt({message: 'Comment count must be an integer'})
  public commentCount?: number;

  @IsOptional()
  @IsLatitude({message: 'Latitude count must be a valid latitude coordinate'})
  public latitude?: number;

  @IsOptional()
  @IsInt({message: 'Longitude count must be an integer'})
  @IsLongitude({message: 'Longitude count must be a valid longitude coordinate'})
  public longitude?: number;
}
