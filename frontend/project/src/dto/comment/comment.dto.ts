import { UserType } from '../../const';

export type User = {
  name: string;
  email: string;
  avatarPath: string;
  type: UserType;
};

export default class CommentDto {
  public id!: string;

  public text!: string;

  public rating!: number;

  public offerId!: string;

  public postDate!: string;

  public user!: User;
}
