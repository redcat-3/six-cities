import { Location } from '../../../types/location.type.js';
import {OfferType} from '../../../types/offer-type.enum.js';

export default class UpdateOfferDto {
  public title!: string;
  public description!: string;
  public postDate!: Date;
  public city!:	string;
  public previewImage!: string;
  public images!: string[];
  public isPremium!: boolean;
  public isFavorite!: boolean;
  public rating!: number;
  public type!: OfferType;
  public bedroomsNumber!: number;
  public maxAdultsNumber!: number;
  public price!: number;
  public features!: string[];
  public hostId!: string;
  public location!: Omit<Location, 'zoom'>;
}
