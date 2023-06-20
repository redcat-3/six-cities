import { Expose, Type } from 'class-transformer';
import UserRdo from '../../user/rdo/user.rdo.js';

export default class OfferRdo {
  @Expose()
  public id!: string;

  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose({ name: 'createdAt'})
  public postDate!: string;

  @Expose()
  public city!: string;

  @Expose()
  public previewImage!: string;

  @Expose()
  public images!: string[];

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public isFavorite!: false;

  @Expose()
  public rating!: number;

  @Expose()
  public type!: string;

  @Expose()
  public bedroomsNumber!: number;

  @Expose()
  public maxAdultsNumber!: number;

  @Expose()
  public price!: number;

  @Expose()
  public features!: string;

  @Expose({ name: 'host'})
  @Type(() => UserRdo)
  public user!: UserRdo;

  @Expose()
  public commentCount!: number;

  @Expose()
  public latitude!: number;

  @Expose()
  public longitude!: number;
}
