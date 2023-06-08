import {IsEmail, IsString, IsBoolean} from 'class-validator';

export default class LoginUserDto {
  @IsEmail({}, {message: 'email must be a valid address'})
  public email!: string;

  @IsBoolean({message: 'isPro is required'})
  public isPro!: boolean;

  @IsString({message: 'avatarPath is required'})
  public avatarPath!: string;

  @IsString({message: 'password is required'})
  public password!: string;
}
