import { Expose } from 'class-transformer';

export default class OfferIndexRdo {
  @Expose()
  public title!: string;

  @Expose({ name: 'createdAt'})
  public postDate!: string;

  @Expose()
  public city!: string;

  @Expose()
  public previewImage!: string;

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public isFavorite!: false;

  @Expose()
  public rating!: number;

  @Expose()
  public type!: string;

  @Expose()
  public price!: number;

  @Expose()
  public commentCount!: number;
}
