import { CityLocation } from '../../const';
import CommentDto from '../../dto/comment/comment.dto';
import CreateOfferDto from '../../dto/offer/create-offer.dto';
import OfferDto from '../../dto/offer/offer.dto';
import UserWithTokenDto from '../../dto/user/user-with-token.dto';
import UserDto from '../../dto/user/user.dto';
import { Offer, User, Comment, NewOffer } from '../../types/types';

export const adaptLoginToClient =
  (user: UserWithTokenDto): User => ({
    name: user.name,
    type: user.type,
    email: user.email,
    avatarUrl: user.avatarPath,
  });

export const adaptUserToClient =
  (user: UserDto): User => ({
    name: user.name,
    type: user.type,
    email: user.email,
    avatarUrl: user.avatarPath,
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
        postDate: offer.postDate,
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
        maxAdults: offer.guestNumber
      }));

export const adaptOfferToClient =
  (offer: OfferDto): Offer =>
    ({
      id: offer.id,
      price: offer.price,
      rating: offer.rating,
      title: offer.title,
      postDate: offer.postDate,
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
      maxAdults: offer.guestNumber
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

export const adaptCreateOfferToClient = (createOfferDto: CreateOfferDto): NewOffer => {
  const offer: NewOffer = {
    price: createOfferDto.price,
    title: createOfferDto.title,
    isPremium: createOfferDto.isPremium,
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
    images: createOfferDto.images,
    maxAdults: createOfferDto.guestNumber,
  };
  return offer;
};
