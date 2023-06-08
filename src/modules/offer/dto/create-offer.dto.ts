import { OfferType } from '../../../types/offer-type.enum.js';
import { IsArray, IsDateString, IsEnum, IsInt, IsMongoId, IsBoolean, Max, MaxLength, Min, MinLength } from 'class-validator';
import { Title, Description, RoomsNumber, Rating, AdultsNumber, Price, Latitude, Longitude } from '../../../../const.js';
import { City } from '../../../types/city.enum.js';
import { FeatureType } from '../../../types/feature-type.enum.js';

export default class CreateOfferDto {
  @MinLength(Title.Min, {message: 'Minimum title length must be $Title.Min'})
  @MaxLength(Title.Max, {message: 'Maximum title length must be $Title.Max'})
  public title!: string;

  @MinLength(Description.Min, {message: 'Minimum title length must be $Description.Min'})
  @MaxLength(Description.Max, {message: 'Maximum title length must be $Description.Max'})
  public description!: string;

  @IsDateString({}, {message: 'postDate must be valid ISO date'})
  public postDate!: Date;

  @IsEnum(City, {message: 'type must be Paris, or Cologne, or Brussels, or Amsterdam, or Hamburg, or Dusseldorf'})
  public city!:	string;

  @MaxLength(256, {message: 'Too short for field «image»'})
  public previewImage!: string;

  @IsArray({message: 'Field images must be an array'})
  @MaxLength(256, {message: 'Too short for field «image»'})
  public images!: string[];

  @IsBoolean({message: 'Field isPremium must be boolean'})
  public isPremium!: boolean;

  @IsBoolean({message: 'Field isFavorite must be boolean'})
  public isFavorite!: boolean;

  @IsInt({message: 'Rating must be an integer'})
  @Min(Rating.Min, {message: 'Minimum rating is $Rating.Min'})
  @Max(Rating.Max, {message: 'Maximum rating is $Rating.Max'})
  public rating!: number;

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
  @IsEnum({each: FeatureType, message: 'Features field must be an array of valid values'})
  public features!: string[];

  @IsMongoId({message: 'hostId field must be valid an id'})
  public hostId!: string;

  @IsInt({message: 'Comment count must be an integer'})
  public commentCount!: number;
  // public static async findBySpecies(this: ReturnModelType<typeof OfferEntity>, commentCount: number) {
  //   return this.getCommentsCount({ commentCount }).exec();
  // }

  @IsInt({message: 'Latitude count must be an integer'})
  @Min(Latitude.Min, {message: 'Minimum rating is $Latitude.Min'})
  @Max(Latitude.Max, {message: 'Maximum rating is $Latitude.Max'})
  public latitude!: number;

  @IsInt({message: 'Longitude count must be an integer'})
  @Min(Longitude.Min, {message: 'Minimum rating is $Longitude.Min'})
  @Max(Longitude.Max, {message: 'Maximum rating is $Longitude.Max'})
  public longitude!: number;
}
