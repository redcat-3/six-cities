import { UserType } from '../../const';

export default class CreateUserWithIdDto {
  public id!: string;
  public name!: string;
  public avatarPath!: string;
  public type!: UserType;
  public email!: string;
  public password!: string;
}
