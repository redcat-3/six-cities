import CreateOfferDto from '../../dto/offer/create-offer.dto';
import OfferDto, { CityNames, FeatureType } from '../../dto/offer/offer.dto';
import UpdateOfferDto, { RentType } from '../../dto/offer/update-offer.dto';
import CreateUserDto from '../../dto/user/create-user.dto';
import { NewOffer, Offer, Type, UserRegister } from '../../types/types';
import { getTime } from '../utils';

const mapTypeToRentType = (type: Type): RentType => {
  switch (type) {
    case 'apartment':
      return RentType.APARTMENT;
    case 'house':
      return RentType.HOUSE;
    case 'room':
      return RentType.ROOM;
    case 'hotel':
      return RentType.HOTEL;
    default:
      throw new Error(`Invalid type: ${type}`);
  }
};

export const adaptRegistrToServer =
  (user: UserRegister): CreateUserDto => ({
    name: user.name,
    userType: user.type,
    email: user.email,
    avatar: ' ',
    password: user.password,
  });

export const adaptEditOfferToServer =
  (offer: Offer): UpdateOfferDto => ({
    title: offer.title,
    description: offer.description,
    postDate: getTime(),
    city: offer.city.name,
    previewImage: offer.previewImage,
    images: offer.images,
    isPremium: offer.isPremium,
    type: mapTypeToRentType(offer.type),
    roomsNumber: offer.bedrooms,
    gestNumber: offer.maxAdults,
    price: offer.price,
    features: offer.goods as FeatureType[],
    userId: {
      name: offer.host.name,
      avatar: offer.host.avatarUrl,
      email: offer.host.email,
      userType: offer.host.type
    },
    latitude: offer.location.latitude,
    longitude: offer.location.longitude,
  });

export const adaptOfferToServer =
  (offer: Offer): OfferDto =>
    ({
      id: offer.id,
      title: offer.title,
      description: offer.description,
      city: offer.city.name,
      latitude: offer.location.latitude,
      longitude: offer.location.longitude,
      previewImage: offer.previewImage,
      isPremium: offer.isPremium,
      isFavorite: offer.isFavorite,
      rating: Number(offer.rating),
      type: mapTypeToRentType(offer.type),
      roomsNumber: offer.bedrooms,
      guestsNumber: offer.maxAdults,
      price: Number(offer.price),
      features: offer.goods as FeatureType[],
      images: offer.images,
      user: {
        name: offer.host.name,
        avatar: offer.host.avatarUrl,
        email: offer.host.email,
        userType: offer.host.type
      }
    });

export const adaptCreateOfferToServer = (newOffer: NewOffer): CreateOfferDto => {
  const createOfferDto = new CreateOfferDto();
  createOfferDto.title = newOffer.title;
  createOfferDto.description = newOffer.description;
  createOfferDto.city = newOffer.city.name as CityNames;
  createOfferDto.isPremium = newOffer.isPremium;
  createOfferDto.type = mapTypeToRentType(newOffer.type);
  createOfferDto.roomsNumber = newOffer.bedrooms;
  createOfferDto.guestNumber = newOffer.maxAdults;
  createOfferDto.price = newOffer.price;
  createOfferDto.features = newOffer.goods as FeatureType[];
  createOfferDto.latitude = newOffer.location.latitude;
  createOfferDto.longitude = newOffer.location.longitude;
  createOfferDto.images = newOffer.images;
  return createOfferDto;
};

export const adaptPreviewImageToServer =
  (file: string) => {
    const formData = new FormData();
    formData.set('previewImage', file);

    return formData;
  };

export const adaptAvatarToServer =
  (file: File) => {
    const formData = new FormData();
    formData.set('avatar', file);

    return formData;
  };
