import typegoose, { defaultClasses, Ref } from '@typegoose/typegoose';
import { UserEntity } from '../user/user.entity.js';
import { RentType } from '../../types/rent-type.enum.js';
import { CityNames } from '../../types/city-names.enum.js';
import { FeatureType } from '../../types/feature-type.enum.js';
import { TITLE_LENGHT, DESC_LENGHT, ROOMS_NUMBER, GEST_NUMBER, PRICE, RATING } from './offer.constant.js';

const { prop, modelOptions } = typegoose;

export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({
    trim: true,
    required: true,
    minlength: TITLE_LENGHT.MIN,
    maxlength: TITLE_LENGHT.MAX
  })
  public title!: string;

  @prop({
    trim: true,
    required: true,
    minlength: DESC_LENGHT.MIN,
    maxlength: DESC_LENGHT.MAX
  })
  public description!: string;

  @prop({
    type: () => String,
    enum: CityNames,
    required: true
  })
  public city!: CityNames;

  @prop({required: true})
  public previewImage!: string;

  @prop({
    required: true,
    type: [String]
  })
  public images!: string[];

  @prop({required: true})
  public isPremium!: boolean;

  @prop({
    required: true,
    default: false,
  })
  public isFavorite?: boolean;

  @prop({
    default: 0,
    max: RATING.MAX
  })
  public rating!: number;

  @prop({
    type: () => String,
    enum: RentType,
    required: true
  })
  public type!: RentType;

  @prop({
    required: true,
    min: ROOMS_NUMBER.MIN,
    max: ROOMS_NUMBER.MAX
  })
  public roomsNumber!: number;

  @prop({
    required: true,
    min: GEST_NUMBER.MIN,
    max: GEST_NUMBER.MAX
  })
  public gestNumber!: number;

  @prop({
    required: true,
    min: PRICE.MIN,
    max: PRICE.MAX
  })
  public price!: number;

  @prop({
    type: () => String,
    required: true,
    default: [String],
    enum: FeatureType
  })
  public features!: FeatureType[];

  @prop({
    ref: () => UserEntity,
    required: true
  })
  public userId!: Ref<UserEntity>;

  @prop({default: 0})
  public commentCount!: number;

  @prop({required: true})
  public latitude!: number;

  @prop({required: true})
  public longitude!: number;

  public setIsFavorite(newValue: boolean) {
    this.isFavorite = newValue;
    return this.isFavorite;
  }

  public getIsFavorite() {
    return this.isFavorite;
  }
}
