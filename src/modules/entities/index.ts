import { getModelForClass } from '@typegoose/typegoose';

import { UserEntity } from '../user/user.entity.js';
import { OfferEntity } from '../offer/offer.entity.js';
import { CommentEntity } from '../comment/comment.entity.js';

export const UserModel = getModelForClass(UserEntity);
export const OfferModel = getModelForClass(OfferEntity);
export const CommentModel = getModelForClass(CommentEntity);
