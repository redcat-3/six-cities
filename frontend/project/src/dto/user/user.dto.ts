enum UserType {
  Regular = 'regular',
  Pro = 'pro',
}

export default class UserDto {
  public name!: string;
  public avatarPath!: string;
  public type!: UserType;
  public email!: string;
}
