import { IsEmail, IsString, Length } from 'class-validator';
import { NAME_LENGHT, PASSWORD_LENGHT } from '../user.constant.js';
import { UserType } from '../../../types/user-type.enum.js';

export default class CreateUserDto {
  @IsEmail({}, {message: 'Email must be valid address'})
  public email!: string;

  @IsString({message: 'name is required'})
  @Length(NAME_LENGHT.MIN, NAME_LENGHT.MAX, {message: `Min length is ${NAME_LENGHT.MIN}, max is ${NAME_LENGHT.MAX}`})
  public name!: string;

  @IsString({message: 'Status of user is required'})
  public isPro!: UserType;

  @IsString({message: 'password is required'})
  @Length(PASSWORD_LENGHT.MIN, PASSWORD_LENGHT.MAX, {message: `Min length for password is ${PASSWORD_LENGHT.MIN}, max is  ${PASSWORD_LENGHT.MAX}`})
  public password!: string;
}
