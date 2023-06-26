import typegoose, { defaultClasses, getModelForClass, Ref } from '@typegoose/typegoose';
import { UserEntity } from '../user/user.entity.js';
import { RentType } from '../../types/rent-type.enum.js';
import { CityNames } from '../../types/city-names.enum.js';
import { FeatureType } from '../../types/feature-type.enum.js';
import { MAX_TITLE_LENGHT, MIN_TITLE_LENGHT, MIN_DESC_LENGHT, MAX_DESC_LENGHT, MIN_ROOMS_NUMBER, MAX_ROOMS_NUMBER, MIN_GEST_NUMBER, MAX_GEST_NUMBER, MIN_PRICE, MAX_PRICE, MAX_RATING } from './offer.constant.js';

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
    minlength: MIN_TITLE_LENGHT,
    maxlength: MAX_TITLE_LENGHT
  })
  public title!: string;

  @prop({
    trim: true,
    required: true,
    minlength: MIN_DESC_LENGHT,
    maxlength: MAX_DESC_LENGHT
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
  private isFavorite?: boolean;

  @prop({
    default: 0,
    max: MAX_RATING
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
    min: MIN_ROOMS_NUMBER,
    max: MAX_ROOMS_NUMBER
  })
  public roomsNumber!: number;

  @prop({
    required: true,
    min: MIN_GEST_NUMBER,
    max: MAX_GEST_NUMBER
  })
  public gestNumber!: number;

  @prop({
    required: true,
    min: MIN_PRICE,
    max: MAX_PRICE
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
    ref: UserEntity,
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

export const OfferModel = getModelForClass(OfferEntity);
