import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { AppComponent } from '../../types/app-component.enum.js';
import { CommentServiceInterface } from './comment-service.interface.js';
import { CommentEntity } from './comment.entity.js';
import { CommentModel } from '../entities/index.js';
import CommentService from './comment.service.js';
import CommentController from './comment.controller.js';
import { ControllerInterface } from '../../core/controller/controller.interface.js';

export function createCommentContainer() {
  const commentContainer = new Container();

  commentContainer.bind<CommentServiceInterface>(AppComponent.CommentServiceInterface)
    .to(CommentService)
    .inSingletonScope();

  commentContainer.bind<types.ModelType<CommentEntity>>(AppComponent.CommentModel)
    .toConstantValue(CommentModel);

  commentContainer.bind<ControllerInterface>(AppComponent.CommentController)
    .to(CommentController).inSingletonScope();

  return commentContainer;
}
