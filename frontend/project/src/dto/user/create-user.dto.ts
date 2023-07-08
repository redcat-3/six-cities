import { UserType } from '../../const';

export default class CreateUserDto {
  public name!: string;

  public email!: string;

  public avatarPath!: string;

  public type!: UserType;

  public password!: string;
}
