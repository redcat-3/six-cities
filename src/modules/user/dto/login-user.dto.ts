import {IsEmail, IsString, Length } from 'class-validator';
import { PASSWORD_LENGHT } from '../user.constant.js';

export default class LoginUserDto {
  @IsEmail({}, {message: 'email must be a valid address'})
  public email!: string;

  @IsString({message: 'password is required'})
  @Length(PASSWORD_LENGHT.MIN, PASSWORD_LENGHT.MAX, {message: `Min length for password is ${PASSWORD_LENGHT.MIN}, max is  ${PASSWORD_LENGHT.MAX}`})
  public password!: string;
}
