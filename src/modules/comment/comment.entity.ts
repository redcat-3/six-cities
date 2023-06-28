import typegoose, { defaultClasses, Ref } from '@typegoose/typegoose';
import { OfferEntity } from '../offer/offer.entity.js';
import { UserEntity } from '../user/user.entity.js';
import { LENGTH_COMMENT_TEXT, RATING } from './comment.constant.js';

const { prop, modelOptions } = typegoose;

export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'comments'
  }
})

export class CommentEntity extends defaultClasses.TimeStamps {

  @prop({
    trim: true,
    required: true,
    minlength: LENGTH_COMMENT_TEXT.MIN,
    maxlength: LENGTH_COMMENT_TEXT.MAX
  })
  public text!: string;

  @prop({
    required: true,
    min: RATING.MIN,
    max: RATING.MAX
  })
  public rating!: number;

  @prop({
    ref: () => OfferEntity,
    required: true
  })
  public offerId!: Ref<OfferEntity>;

  @prop({
    ref: () => UserEntity,
    required: true,
  })
  public userId!: Ref<UserEntity>;
}
