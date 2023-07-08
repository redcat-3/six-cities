import { UserType } from '../../const';

export type User = {
  name: string;
  email: string;
  avatarPath: string;
  type: UserType;
};

export default class CreateCommentDto {
  public text!: string;

  public rating!: number;

  public offerId!: string;

  public postDate!: string;

  public userId!: User;
}
