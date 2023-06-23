import typegoose, { defaultClasses, getModelForClass, Ref } from '@typegoose/typegoose';
import { UserEntity } from '../user/user.entity.js';
import { OfferType } from '../../types/rent-type.enum.js';
import { City } from '../../types/city-names.enum.js';
import { FeatureType } from '../../types/feature-type.enum.js';

const { prop, modelOptions } = typegoose;

export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({trim: true, required: true})
  public title!: string;

  @prop({trim: true, required: true})
  public description!: string;

  @prop({
    type: () => String,
    enum: City,
    required: true
  })
  public city!: City;

  @prop({required: true})
  public previewImage!: string;

  @prop({
    required: true,
    type: String
  })
  public images!: string[];

  @prop({required: true})
  public isPremium!: boolean;

  @prop({
    required: true,
    default: false,
  })
  private isFavorite?: boolean;

  @prop({default: 0})
  public rating!: number;

  @prop({
    type: () => String,
    enum: OfferType,
    required: true
  })
  public type!: OfferType;

  @prop({required: true})
  public bedroomsNumber!: number;

  @prop({required: true})
  public maxAdultsNumber!: number;

  @prop({required: true})
  public price!: number;

  @prop({
    type: () => String,
    required: true,
    default: [],
  })
  public features!: FeatureType[];

  @prop({
    ref: UserEntity,
    required: true
  })
  public hostId!: Ref<UserEntity>;

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
