import { CityLocation } from '../../const';
import CommentDto from '../../dto/comment/comment.dto';
import CreateOfferDto from '../../dto/offer/create-offer.dto';
import OfferDto from '../../dto/offer/offer.dto';
import UserWithTokenDto from '../../dto/user/user-with-token.dto';
import UserDto from '../../dto/user/user.dto';
import { Offer, User, Comment } from '../../types/types';

export const adaptLoginToClient =
  (user: UserWithTokenDto): User => ({
    name: user.name,
    type: user.userType,
    email: user.email,
    avatarUrl: user.avatar,
  });

export const adaptUserToClient =
  (user: UserDto): User => ({
    name: user.name,
    type: user.userType,
    email: user.email,
    avatarUrl: user.avatar,
  });

export const adaptOffersToClient =
  (offers: OfferDto[]): Offer[] =>
    offers
      .filter((offer: OfferDto) =>
        offer.user !== null,
      )
      .map((offer: OfferDto) => ({
        id: offer.id,
        price: offer.price,
        rating: offer.rating,
        title: offer.title,
        isPremium: offer.isPremium,
        isFavorite: offer.isFavorite,
        city: {
          name: offer.city,
          location: CityLocation[offer.city]
        },
        location: { latitude: offer.latitude, longitude: offer.longitude },
        previewImage: offer.previewImage,
        type: offer.type,
        bedrooms: offer.roomsNumber,
        description: offer.description,
        goods: offer.features,
        host: adaptUserToClient(offer.user),
        images: offer.images,
        maxAdults: offer.guestsNumber
      }));

export const adaptOfferToClient =
  (offer: OfferDto): Offer =>
    ({
      id: offer.id,
      title: offer.title,
      description: offer.description,
      city: {
        name: offer.city,
        location: CityLocation[offer.city]
      },
      location: { latitude: offer.latitude, longitude: offer.longitude },
      previewImage: offer.previewImage,
      isPremium: offer.isPremium,
      isFavorite: offer.isFavorite,
      rating: Number(offer.rating),
      type: offer.type,
      bedrooms: offer.roomsNumber,
      maxAdults: offer.guestsNumber,
      price: Number(offer.price),
      goods: offer.features,
      images: offer.images,
      host: {
        name: offer.user.name,
        avatarUrl: offer.user.avatar,
        email: offer.user.email,
        type: offer.user.userType
      }
    });

export const adaptCommentsToClient =
  (comments: CommentDto[]): Comment[] =>
    comments
      .filter((comment: CommentDto) =>
        comment.user !== null,
      )
      .map((comment: CommentDto) => ({
        id: comment.id,
        comment: comment.text,
        date: comment.postDate,
        rating: comment.rating,
        user: adaptUserToClient(comment.user),
      }));

export const adaptCreateOfferToClient = (createOfferDto: CreateOfferDto): Offer => {
  const offer: Offer = {
    id: createOfferDto.id,
    price: createOfferDto.price,
    title: createOfferDto.title,
    isPremium: createOfferDto.isPremium,
    isFavorite: createOfferDto.isFavorite,
    previewImage: createOfferDto.previewImage,
    city: {
      name: createOfferDto.city,
      location: CityLocation[createOfferDto.city]
    },
    location: { latitude: createOfferDto.latitude, longitude: createOfferDto.longitude },
    type: createOfferDto.type,
    bedrooms: createOfferDto.roomsNumber,
    description: createOfferDto.description,
    goods: createOfferDto.features,
    host: {
      name: createOfferDto.userId.name,
      avatarUrl: createOfferDto.userId.avatar,
      email: createOfferDto.userId.email,
      type: createOfferDto.userId.userType,
    },
    images: createOfferDto.images,
    maxAdults: createOfferDto.guestNumber,
    rating: createOfferDto.rating
  };
  return offer;
};
