import { UserType } from './user-type.enum';

export type User = {
  email: string;
  avatarPath?: string;
  name: string;
  isPro: UserType;
}
