import { UserEntity } from './user.entity.js';
import { DocumentType, mongoose, types } from '@typegoose/typegoose';
import CreateUserDto from './dto/create-user.dto.js';
import { UserServiceInterface } from './user-service.interface.js';
import { inject, injectable } from 'inversify';
import { AppComponent } from '../../types/app-component.enum.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import UpdateUserDto from './dto/update-user.dto.js';
import LoginUserDto from './dto/login-user.dto.js';

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

  public async addToFavoriteById(
    userId: string,
    offerId: string
  ): Promise<void> {
    await this.userModel.findOneAndUpdate(
      { _id: userId },
      {
        $addToSet: { favoriteOffers: new mongoose.Types.ObjectId(offerId) },
      },
      { new: true, upsert: true }
    );
  }

  public async removeFromFavoritesById(
    userId: string,
    offerId: string
  ): Promise<void> {
    await this.userModel.findOneAndUpdate(
      { _id: userId },
      {
        $pull: { favoriteOffers: new mongoose.Types.ObjectId(offerId) },
      },
      { new: true }
    );
  }

  public async exists(userId: string): Promise<boolean> {
    return (await this.userModel.exists({_id: userId})) !== null;
  }
}
