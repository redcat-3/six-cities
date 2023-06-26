import { UserEntity } from './user.entity.js';
import { DocumentType, types } from '@typegoose/typegoose';
import CreateUserDto from './dto/create-user.dto.js';
import {UserServiceInterface} from './user-service.interface.js';
import { inject, injectable } from 'inversify';
import { AppComponent } from '../../types/app-component.enum.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import UpdateUserDto from './dto/update-user.dto.js';
import LoginUserDto from './dto/login-user.dto.js';
import HttpError from '../../core/errors/http-error.js';
import { StatusCodes } from 'http-status-codes';

@injectable()
export default class UserService implements UserServiceInterface {
  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponent.UserModel) private readonly userModel: types.ModelType<UserEntity>
  ) {}

  public async create(dto: CreateUserDto): Promise<DocumentType<UserEntity>>{
    const user = new UserEntity(dto);
    const salt = process.env.SALT;
    user.setPassword(dto.password, salt ? salt : '');

    const result = await this.userModel.create(user);
    this.logger.info(`New user created: ${user.email}`);

    return result;
  }

  public async findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne({email}).exec();
  }

  public async findById(userId: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne({userId}).exec();
  }

  public async findOrCreate(dto: CreateUserDto): Promise<DocumentType<UserEntity>> {
    const existedUser = await this.findByEmail(dto.email);

    if (existedUser) {
      return existedUser;
    }

    return this.create(dto);
  }

  public async updateById(userId: string, dto: UpdateUserDto): Promise<DocumentType<UserEntity> | null> {
    return this.userModel
      .findByIdAndUpdate(userId, dto, {new: true})
      .exec();
  }

  public async verifyUser(dto: LoginUserDto, salt: string): Promise<DocumentType<UserEntity> | null> {
    const user = await this.findByEmail(dto.email);

    if (! user) {
      return null;
    }

    if (user.verifyPassword(dto.password, salt)) {
      return user;
    } else {
      return null;
    }
  }

  public async addFavorite(offerId: string, userId: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel
      .findByIdAndUpdate(userId, { $push: {favoriteOffers: offerId}}, {upset: true})
      .exec();
  }

  public async deleteFavorite(offerId: string, userId: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel
      .findByIdAndUpdate(userId, { $pull: {favoriteOffers: offerId}}, {upset: true})
      .exec();
  }

  public async changeFavorite(offerId: string, userId: string): Promise<boolean> {
    const foundedUser = await this.findById(userId);
    let result = false;
    if(!foundedUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'UserController'
      );
    }
    if(foundedUser) {
      console.log(foundedUser.getFavoriteOffers());
      if(foundedUser.isFavoriteOffers(offerId)) {
        foundedUser.deleteFavoriteOffers(offerId);
      } else {
        foundedUser.addFavoriteOffers(offerId);
        result = true;
      }
    }
    await foundedUser.save();
    return result;
  }

}
