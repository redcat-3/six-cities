import { Expose, Type } from 'class-transformer';
import UserResponse from '../../user/rdo/user.rdo.js';
import OfferResponse from '../../offer/rdo/offer.rdo.js';

export default class CommentRdo {
  @Expose({ name: 'offerId'})
  @Type(() => OfferResponse)
  public offer!: OfferResponse;

  @Expose()
  public text!: string;

  @Expose()
  public rating!: number;

  @Expose({ name: 'createdAt'})
  public postDate!: string;

  @Expose({ name: 'userId'})
  @Type(() => UserResponse)
  public user!: UserResponse;
}
