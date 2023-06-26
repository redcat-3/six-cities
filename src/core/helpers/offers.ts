import { FeatureType } from '../../types/feature-type.enum.js';
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
    roomsNumber,
    gestNumber,
    price,
    features,
    email,
    avatarPath,
    name,
    isPro,
    latitude,
    longitude,
  ] = offerData.replace('\n', '').split('\t');

  return {
    title,
    description,
    postDate: new Date(createdDate).toISOString,
    city,
    previewImage,
    images: images.split(';'),
    isPremium: Boolean(isPremium),
    rating: Number.parseFloat(rating),
    type,
    roomsNumber: Number.parseInt(roomsNumber, 10),
    gestNumber: Number.parseInt(gestNumber, 10),
    price: Number.parseFloat(price),
    features: features.split(';') as unknown as FeatureType[],
    user: { email, avatarPath, name, isPro },
    latitude: Number.parseInt(latitude, 10),
    longitude: Number.parseInt(longitude, 10)
  } as unknown as Offer;
}
