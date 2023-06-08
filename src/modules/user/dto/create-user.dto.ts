import { IsEmail, IsString, IsBoolean, Length } from 'class-validator';
import { Name } from '../../../../const.js';

export default class CreateUserDto {
  @IsEmail({}, {message: 'email must be valid address'})
  public email!: string;

  @IsString({message: 'avatarPath is required'})
  public avatarPath!: string;

  @IsString({message: 'name is required'})
  @Length(Name.Min, Name.Max, {message: 'Min length is $Name.Min, max is $Name.Max'})
  public name!: string;

  @IsBoolean({message: 'isPro is required'})
  public isPro!: boolean;

  @IsString({message: 'password is required'})
  public password!: string;
}
