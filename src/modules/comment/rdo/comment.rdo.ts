import { Expose, Type } from 'class-transformer';
import UserRdo from '../../user/rdo/user.rdo.js';
import OfferRdo from '../../offer/rdo/offer.rdo.js';

export default class CommentRdo {
  @Expose({ name: 'offerId'})
  @Type(() => OfferRdo)
  public offer!: OfferRdo;

  @Expose()
  public text!: string;

  @Expose()
  public rating!: number;

  @Expose({ name: 'createdAt'})
  public postDate!: string;

  @Expose({ name: 'userId'})
  @Type(() => UserRdo)
  public user!: UserRdo;
}
