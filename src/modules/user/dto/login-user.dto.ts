import {IsEmail, IsString, Length } from 'class-validator';
import { MAX_NAME_LENGHT, MAX_PASSWORD_LENGHT, MIN_NAME_LENGHT, MIN_PASSWORD_LENGHT } from '../user.constant';

export default class LoginUserDto {
  @IsEmail({}, {message: 'email must be a valid address'})
  @Length(MIN_NAME_LENGHT, MAX_NAME_LENGHT, {message: `Min length is ${MIN_NAME_LENGHT}, max is ${MAX_NAME_LENGHT}`})
  public email!: string;

  @IsString({message: 'password is required'})
  @Length(MIN_PASSWORD_LENGHT, MAX_PASSWORD_LENGHT, {message: `Min length for password is ${MIN_PASSWORD_LENGHT}, max is  ${MAX_PASSWORD_LENGHT}`})
  public password!: string;
}
