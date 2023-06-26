import { IsEmail, IsString, IsUrl, Length, Matches } from 'class-validator';
import { MAX_NAME_LENGHT, MAX_PASSWORD_LENGHT, MIN_NAME_LENGHT, MIN_PASSWORD_LENGHT } from '../user.constant.js';
import { UserType } from '../../../types/user-type.enum.js';

export default class CreateUserDto {
  @IsEmail({}, {message: 'Email must be valid address'})
  public email!: string;

  @IsUrl()
  @Matches((/\.(jpe?g|png)$/i), {message: 'File should be end with any one of the following extensions: jpg, jpeg, png'})
  public avatarPath?: string;

  @IsString({message: 'name is required'})
  @Length(MIN_NAME_LENGHT, MAX_NAME_LENGHT, {message: `Min length is ${MIN_NAME_LENGHT}, max is ${MAX_NAME_LENGHT}`})
  public name!: string;

  @IsString({message: 'Status of user is required'})
  public isPro!: UserType;

  @IsString({message: 'password is required'})
  @Length(MIN_PASSWORD_LENGHT, MAX_PASSWORD_LENGHT, {message: `Min length for password is ${MIN_PASSWORD_LENGHT}, max is  ${MAX_PASSWORD_LENGHT}`})
  public password!: string;
}
