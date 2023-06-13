import { User } from '../../types/user.type.js';
import typegoose, { defaultClasses, getModelForClass } from '@typegoose/typegoose';
import { createSHA256 } from '../../core/helpers/common.js';
import { DEFAULT_USER_AVATAR } from './user.constant.js';

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

  @prop({ required: true, default: '' })
  public isPro: boolean;

  @prop({required: true, default: ''})
  private password?: string;

  constructor(userData: User) {
    super();
    this.email = userData.email;
    this.avatarPath = userData.avatarPath ? userData.avatarPath : DEFAULT_USER_AVATAR;
    this.name = userData.name;
    this.isPro = userData.isPro;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}
export const UserModel = getModelForClass(UserEntity);
