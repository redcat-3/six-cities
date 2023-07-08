import { RentType } from '../../../types/rent-type.enum.js';
import { IsEnum, IsInt, IsBoolean, Max, MaxLength, Min, MinLength, IsLatitude, IsLongitude, IsArray, ArrayMinSize, IsString } from 'class-validator';
import { CityNames } from '../../../types/city-names.enum.js';
import { TITLE_LENGHT, DESC_LENGHT, COUNT_OF_IMAGES, ROOMS_NUMBER, GUEST_NUMBER, PRICE } from '../offer.constant.js';
import { FeatureType } from '../../../types/feature-type.enum.js';

export default class CreateOfferDto {
  @MinLength(TITLE_LENGHT.MIN, {message: `Minimum title length must be ${TITLE_LENGHT.MIN}`})
  @MaxLength(TITLE_LENGHT.MAX, {message: `Maximum title length must be ${TITLE_LENGHT.MAX}`})
  public title!: string;

  @MinLength(DESC_LENGHT.MIN, {message: `Minimum title length must be ${DESC_LENGHT.MIN}`})
  @MaxLength(DESC_LENGHT.MAX, {message: `Maximum title length must be ${DESC_LENGHT.MAX}`})
  public description!: string;

  @IsEnum(CityNames, {message: `type must be  ${Object.values(RentType)}`})
  public city!:	CityNames;

  @IsArray()
  @ArrayMinSize(COUNT_OF_IMAGES, {message: `Count of image must be ${COUNT_OF_IMAGES}`})
  public images!: string[];

  @IsBoolean({message: 'Field isPremium must be boolean'})
  public isPremium!: boolean;

  @IsString({ message: '$property must be a string' })
  public previewImage?: string;

  @IsEnum(RentType, {message: `type must be ${Object.values(RentType)}`})
  public type!: RentType;

  @IsInt({message: 'RoomsNumber must be an integer'})
  @Min(ROOMS_NUMBER.MIN, {message: `Minimum roomsNumber is ${ROOMS_NUMBER.MIN}`})
  @Max(ROOMS_NUMBER.MAX, {message: `Maximum roomsNumber is ${ROOMS_NUMBER.MAX}`})
  public roomsNumber!: number;

  @IsInt({message: 'GestNumber must be an integer'})
  @Min(GUEST_NUMBER.MIN, {message: `Minimum gestNumber is  ${GUEST_NUMBER.MIN}`})
  @Max(GUEST_NUMBER.MAX, {message: `Maximum gestNumber is ${GUEST_NUMBER.MAX}`})
  public guestNumber!: number;

  @IsInt({message: 'Price must be an integer'})
  @Min(PRICE.MIN, {message: `Minimum price is ${PRICE.MIN}`})
  @Max(PRICE.MAX, {message: `Maximum price is ${PRICE.MAX}`})
  public price!: number;

  @IsEnum(FeatureType, {message: 'type must be FeatureType', each: true})
  public features!: FeatureType[];

  public userId!: string;

  @IsLatitude({message: 'Latitude count must be a valid latitude coordinate'})
  public latitude!: number;

  @IsLongitude({message: 'Longitude count must be a valid longitude coordinate'})
  public longitude!: number;
}
