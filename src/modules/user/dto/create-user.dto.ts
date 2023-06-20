import { IsBoolean, IsEmail, IsString, Length, MaxLength } from 'class-validator';
import { Name, Password } from '../user.constant.js';

export default class CreateUserDto {
  @IsEmail({}, {message: 'email must be valid address'})
  public email!: string;

  @MaxLength(256, {message: 'Too short for field «image»'})
  public avatarPath?: string;

  @IsString({message: 'name is required'})
  @Length(Name.Min, Name.Max, {message: `Min length is ${Name.Min}, max is ${Name.Max}`})
  public name!: string;

  @IsBoolean({message: 'isPro is required'})
  public isPro!: boolean;

  @IsString({message: 'password is required'})
  @Length(Password.Min, Password.Max, {message: `Min length for password is ${Password.Min}, max is  ${Password.Max}`})
  public password!: string;
}
