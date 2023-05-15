import { Offer } from '../../types/offer.type.js';

export function createOffer(offerData: string): Offer {
  const [
    id,
    title,
    description,
    createdDate,
    city,
    previewImage,
    images,
    isPremium,
    isFavorite,
    rating,
    type,
    bedrooms,
    maxAdults,
    price,
    features,
    hostId,
    avatarPath,
    name,
    isPro,
    latitude,
    longitude
  ] = offerData.replace('\n', '').split('\t');

  return {
    id: Number.parseInt(id, 10),
    title,
    description,
    postDate: new Date(createdDate),
    city,
    previewImage,
    images: images.split(';'),
    isPremium: Boolean(isPremium),
    isFavorite: Boolean(isFavorite),
    rating: Number.parseInt(rating, 10),
    type,
    bedrooms: Number.parseInt(bedrooms, 10),
    maxAdults: Number.parseInt(maxAdults, 10),
    price: Number.parseInt(price, 10),
    features: features.split(';'),
    host: {id: Number.parseInt(hostId, 10), avatarPath, name, isPro: Boolean(isPro)},
    location: {latitude: Number.parseInt(latitude, 10), longitude: Number.parseInt(longitude, 10)}
  } as Offer;
}
