import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { CommentServiceInterface } from './comment-service.interface.js';
import { AppComponent } from '../../types/app-component.enum.js';
import CreateCommentDto from './dto/create-comment.dto.js';
import { CommentEntity } from './comment.entity.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { SortType } from '../../types/sort-type.enum.js';
//import { OfferEntity } from '../offer/offer.entity.js';

@injectable()
export default class CommentService implements CommentServiceInterface {
  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponent.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>,
    //@inject(AppComponent.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(dto);
    this.logger.info(`New comment created: ${dto.text}`);

    return comment.populate(['userId']);
  }

  public async findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel
      .find({offerId})
      .sort({createdAt: SortType.Down})
      .populate(['userId']);
  }

  public async deleteByOfferId(offerId: string): Promise<number> {
    return this.commentModel.deleteMany({ offerId }).exec().then((res) => res.deletedCount);
  }
}
