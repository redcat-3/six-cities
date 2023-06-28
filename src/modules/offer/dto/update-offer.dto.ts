import { RentType } from '../../../types/rent-type.enum.js';
import { IsArray, IsDateString, IsEnum, IsInt, IsMongoId, IsBoolean, Max, MaxLength, Min, MinLength, IsOptional, IsNotEmpty, IsUrl, ValidateNested, ArrayMinSize, IsLatitude, IsLongitude } from 'class-validator';
import { TITLE_LENGHT, DESC_LENGHT, COUNT_OF_IMAGES, ROOMS_NUMBER, GEST_NUMBER, PRICE } from '../offer.constant.js';
import { CityNames } from '../../../types/city-names.enum.js';
import { FeatureType } from '../../../types/feature-type.enum.js';

export default class UpdateOfferDto {
  @IsOptional()
  @MinLength(TITLE_LENGHT.MIN, {message: `Minimum title length must be ${TITLE_LENGHT.MIN}`})
  @MaxLength(TITLE_LENGHT.MAX, {message: `Maximum title length must be ${TITLE_LENGHT.MAX}`})
  public title?: string;

  @IsOptional()
  @MinLength(DESC_LENGHT.MIN, {message: `Minimum title length must be ${DESC_LENGHT.MIN}`})
  @MaxLength(DESC_LENGHT.MAX, {message: `Maximum title length must be ${DESC_LENGHT.MAX}`})
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
  @Min(ROOMS_NUMBER.MIN, {message: `Minimum roomsNumber is ${ROOMS_NUMBER.MIN}`})
  @Max(ROOMS_NUMBER.MAX, {message: `Maximum roomsNumber is ${ROOMS_NUMBER.MAX}`})
  public roomsNumber?: number;

  @IsOptional()
  @IsInt({message: 'GestNumber must be an integer'})
  @Min(GEST_NUMBER.MIN, {message: `Minimum gestNumber is  ${GEST_NUMBER.MIN}`})
  @Max(GEST_NUMBER.MAX, {message: `Maximum gestNumber is ${GEST_NUMBER.MAX}`})
  public gestNumber?: number;

  @IsOptional()
  @IsInt({message: 'Price must be an integer'})
  @Min(PRICE.MIN, {message: `Minimum price is ${PRICE.MIN}`})
  @Max(PRICE.MAX, {message: `Maximum price is ${PRICE.MAX}`})
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
