import { RentType } from '../../../types/rent-type.enum.js';
import { IsEnum, IsInt, IsBoolean, Max, MaxLength, Min, MinLength, IsLatitude, IsLongitude, IsNotEmpty, IsUrl, IsArray, ValidateNested, ArrayMinSize } from 'class-validator';
import { CityNames } from '../../../types/city-names.enum.js';
import { MAX_TITLE_LENGHT, MIN_TITLE_LENGHT, MIN_DESC_LENGHT, MAX_DESC_LENGHT, COUNT_OF_IMAGES, MIN_ROOMS_NUMBER, MAX_ROOMS_NUMBER, MIN_GEST_NUMBER, MAX_GEST_NUMBER, MIN_PRICE, MAX_PRICE } from '../offer.constant.js';
import { FeatureType } from '../../../types/feature-type.enum.js';

export default class CreateOfferDto {
  @MinLength(MIN_TITLE_LENGHT, {message: `Minimum title length must be ${MIN_TITLE_LENGHT}`})
  @MaxLength(MAX_TITLE_LENGHT, {message: `Maximum title length must be ${MAX_TITLE_LENGHT}`})
  public title!: string;

  @MinLength(MIN_DESC_LENGHT, {message: `Minimum title length must be ${MIN_DESC_LENGHT}`})
  @MaxLength(MAX_DESC_LENGHT, {message: `Maximum title length must be ${MAX_DESC_LENGHT}`})
  public description!: string;

  @IsEnum(CityNames, {message: `type must be  ${Object.values(RentType)}`})
  public city!:	CityNames;

  @IsNotEmpty({message: 'Preview image is required'})
  @IsUrl()
  public previewImage!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(COUNT_OF_IMAGES, {message: `Count of image must be ${COUNT_OF_IMAGES}`})
  @IsUrl()
  public images!: string[];

  @IsBoolean({message: 'Field isPremium must be boolean'})
  public isPremium!: boolean;

  @IsEnum(RentType, {message: `type must be ${Object.values(RentType)}`})
  public type!: RentType;

  @IsInt({message: 'RoomsNumber must be an integer'})
  @Min(MIN_ROOMS_NUMBER, {message: `Minimum roomsNumber is ${MIN_ROOMS_NUMBER}`})
  @Max(MAX_ROOMS_NUMBER, {message: `Maximum roomsNumber is ${MAX_ROOMS_NUMBER}`})
  public roomsNumber!: number;

  @IsInt({message: 'GestNumber must be an integer'})
  @Min(MIN_GEST_NUMBER, {message: `Minimum gestNumber is  ${MIN_GEST_NUMBER}`})
  @Max(MAX_GEST_NUMBER, {message: `Maximum gestNumber is ${MAX_GEST_NUMBER}`})
  public gestNumber!: number;

  @IsInt({message: 'Price must be an integer'})
  @Min(MIN_PRICE, {message: `Minimum price is ${MIN_PRICE}`})
  @Max(MAX_PRICE, {message: `Maximum price is ${MAX_PRICE}`})
  public price!: number;

  @IsEnum(FeatureType, {message: 'type must be FeatureType', each: true})
  public features!: FeatureType[];

  public userId!: string;

  @IsLatitude({message: 'Latitude count must be a valid latitude coordinate'})
  public latitude!: number;

  @IsLongitude({message: 'Longitude count must be a valid longitude coordinate'})
  public longitude!: number;
}
