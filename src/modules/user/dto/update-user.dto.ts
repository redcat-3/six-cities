import { IsBoolean, IsEmail, IsOptional, IsString, Length } from 'class-validator';
import { Name } from '../../../../const.js';

export default class UpdateUserDto {
  @IsOptional()
  @IsEmail({}, {message: 'email must be a valid address'})
  public email!: string;

  @IsOptional()
  @IsBoolean({message: 'isPro is required'})
  public isPro!: boolean;

  @IsOptional()
  @IsString({message: 'avatarPath is required'})
  public avatarPath!: string;

  @IsOptional()
  @IsString({message: 'name is required'})
  @Length(Name.Min, Name.Max, {message: 'Min length is $Name.Min, max is $Name.Max'})
  public name!: string;

  @IsOptional()
  @IsString({message: 'password is required'})
  public password!: string;
}
