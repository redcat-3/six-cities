import { User } from '../../types/user.type.js';
import typegoose, { Ref, defaultClasses } from '@typegoose/typegoose';
import { createSHA256 } from '../../core/helpers/common.js';
import { DEFAULT_USER_AVATAR } from './user.constant.js';
import { UserType } from '../../types/user-type.enum.js';
import { OfferEntity } from '../offer/offer.entity.js';

const { prop, modelOptions } = typegoose;

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({ unique: true, required: true })
  public email: string;

  @prop({ required: false, default: '' })
  public avatarPath: string;

  @prop({ required: true, default: '' })
  public name: string;

  @prop({
    required: true,
    default: false,
    enum: UserType,
  })
  public isPro: UserType;

  @prop({required: true, default: ''})
  private password?: string;

  @prop({
    required: true,
    ref: () => OfferEntity,
    _id: false,
    default: [],
    type: () => [OfferEntity]
  })
  public favoriteOffers!: Ref<OfferEntity>[];

  constructor(userData: User) {
    super();
    this.email = userData.email;
    this.avatarPath = userData.avatarPath || DEFAULT_USER_AVATAR;
    this.name = userData.name;
    this.isPro = userData.isPro;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }

  public verifyPassword(password: string, salt: string) {
    const hashPassword = createSHA256(password, salt);
    return hashPassword === this.password;
  }
}
