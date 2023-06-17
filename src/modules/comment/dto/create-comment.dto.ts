import {IsMongoId, IsString, Length, IsInt, Min, Max } from 'class-validator';
import { Rating, Text } from '../comment.constant.js';

export default class CreateCommentDto {
  @IsString({message: 'text is required'})
  @Length(Text.Min, Text.Max, {message: 'Min length is 5, max is 1024'})
  public text!: string;

  @IsInt({message: 'Rating must be an integer'})
  @Min(Rating.Min, {message: 'Minimum rating is $Rating.Min'})
  @Max(Rating.Max, {message: 'Maximum rating is $Rating.Max'})
  public rating!: number;

  @IsMongoId({message: 'offerId field must be a valid id'})
  public offerId!: string;

  public userId!: string;
}
