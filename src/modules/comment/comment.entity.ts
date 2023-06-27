import typegoose, { defaultClasses, Ref } from '@typegoose/typegoose';
import { OfferEntity } from '../offer/offer.entity.js';
import { UserEntity } from '../user/user.entity.js';
import { MAX_LENGTH_COMMENT_TEXT, MAX_RATING, MIN_LENGTH_COMMENT_TEXT, MIN_RATING } from './comment.constant.js';

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
    minlength: MIN_LENGTH_COMMENT_TEXT,
    maxlength: MAX_LENGTH_COMMENT_TEXT
  })
  public text!: string;

  @prop({
    required: true,
    min: MIN_RATING,
    max: MAX_RATING
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

//export const CommentModel = getModelForClass(CommentEntity);
