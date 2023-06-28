import { IsEmail, IsOptional, IsString, Length, Matches } from 'class-validator';
import { NAME_LENGHT, PASSWORD_LENGHT } from '../user.constant';
import { UserType } from '../../../types/user-type.enum';

export default class UpdateUserDto {
  @IsOptional()
  @IsEmail({}, {message: 'email must be a valid address'})
  public email?: string;

  @IsOptional()
  @IsString({message: 'Status of user is required'})
  public isPro?: UserType;

  @IsOptional()
  @Matches((/\.(jpe?g|png)$/i), {message: 'File should be end with any one of the following extensions: jpg, jpeg, png'})
  public avatarPath?: string;

  @IsOptional()
  @IsString({message: 'name is required'})
  @Length(NAME_LENGHT.MIN, NAME_LENGHT.MAX, {message: `Min length is ${NAME_LENGHT.MIN}, max is ${NAME_LENGHT.MAX}`})
  public name?: string;

  @IsOptional()
  @IsString({message: 'password is required'})
  @Length(PASSWORD_LENGHT.MIN, PASSWORD_LENGHT.MAX, {message: `Min length for password is ${PASSWORD_LENGHT.MIN}, max is  ${PASSWORD_LENGHT.MAX}`})
  public password?: string;
}
