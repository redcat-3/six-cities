import { UserType } from '../../const';

export default class UserWithTokenDto {
  public name!: string;
  public avatarPath!: string;
  public type!: UserType;
  public email!: string;
  public token!: string;
}
