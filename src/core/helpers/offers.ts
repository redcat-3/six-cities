import { Offer } from '../../types/offer.type.js';

export function createOffer(offerData: string): Offer {
  const [
    title,
    description,
    createdDate,
    city,
    previewImage,
    images,
    isPremium,
    rating,
    type,
    bedroomsNumber,
    maxAdultsNumber,
    price,
    features,
    email,
    avatarPath,
    name,
    isPro,
    latitude,
    longitude
  ] = offerData.replace('\n', '').split('\t');

  return {
    title,
    description,
    postDate: new Date(createdDate),
    city,
    previewImage,
    images: images.split(';'),
    isPremium: Boolean(isPremium),
    rating: Number.parseInt(rating, 10),
    type,
    bedroomsNumber: Number.parseInt(bedroomsNumber, 10),
    maxAdultsNumber: Number.parseInt(maxAdultsNumber, 10),
    price: Number.parseInt(price, 10),
    features: features.split(';'),
    host: {email, avatarPath, name, isPro: Boolean(isPro)},
    latitude: Number.parseInt(latitude, 10),
    longitude: Number.parseInt(longitude, 10)
  } as Offer;
}
