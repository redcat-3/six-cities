import { IsBoolean, IsEmail, IsOptional, IsString, Length, MaxLength } from 'class-validator';
import { Name, Password } from '../user.constant';
import { MIN_LENGHT } from '../../offer/offer.constant';

export default class UpdateUserDto {
  @IsOptional()
  @IsEmail({}, {message: 'email must be a valid address'})
  public email!: string;

  @IsOptional()
  @IsBoolean({message: 'isPro is required'})
  public isPro!: boolean;

  @IsOptional()
  @MaxLength(MIN_LENGHT, {message: 'Too short for field «image»'})
  public avatarPath?: string;

  @IsOptional()
  @IsString({message: 'name is required'})
  @Length(Name.Min, Name.Max, {message:  `Min length is ${Name.Min}, max is ${Name.Max}`})
  public name!: string;

  @IsOptional()
  @IsString({message: 'password is required'})
  @Length(Password.Min, Password.Max, {message: `Min length for password is ${Password.Min}, max is  ${Password.Max}`})
  public password!: string;
}
