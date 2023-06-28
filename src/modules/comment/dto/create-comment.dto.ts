import {IsMongoId, IsString, Length, IsInt, Min, Max, IsNotEmpty } from 'class-validator';
import { RATING, LENGTH_COMMENT_TEXT } from '../comment.constant.js';

export default class CreateCommentDto {
  @IsNotEmpty({message: 'text must be not empty'})
  @IsString({message: 'text is required'})
  @Length(LENGTH_COMMENT_TEXT.MIN, LENGTH_COMMENT_TEXT.MAX, {message: `Min length is ${LENGTH_COMMENT_TEXT.MIN}, max is ${LENGTH_COMMENT_TEXT.MAX}`})
  public text!: string;

  @IsInt({message: 'Rating must be an integer'})
  @Min(RATING.MIN, {message: `Minimum rating is ${RATING.MIN}`})
  @Max(RATING.MAX, {message: `Maximum rating is ${RATING.MAX}`})
  public rating!: number;

  @IsMongoId({message: 'offerId field must be a valid id'})
  public offerId!: string;

  public userId!: string;
}
