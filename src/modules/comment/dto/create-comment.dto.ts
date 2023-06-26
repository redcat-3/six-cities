import {IsMongoId, IsString, Length, IsInt, Min, Max, IsNotEmpty } from 'class-validator';
import { MIN_RATING, MAX_RATING, MIN_LENGTH_COMMENT_TEXT, MAX_LENGTH_COMMENT_TEXT } from '../comment.constant.js';

export default class CreateCommentDto {
  @IsNotEmpty({message: 'text must be not empty'})
  @IsString({message: 'text is required'})
  @Length(MIN_LENGTH_COMMENT_TEXT, MAX_LENGTH_COMMENT_TEXT, {message: `Min length is ${MIN_LENGTH_COMMENT_TEXT}, max is ${MAX_LENGTH_COMMENT_TEXT}`})
  public text!: string;

  @IsInt({message: 'Rating must be an integer'})
  @Min(MIN_RATING, {message: `Minimum rating is ${MIN_RATING}`})
  @Max(MAX_RATING, {message: `Maximum rating is ${MAX_RATING}`})
  public rating!: number;

  @IsMongoId({message: 'offerId field must be a valid id'})
  public offerId!: string;

  public userId!: string;
}
