import { DECIMAL } from '../../modules/offer/offer.constant.js';
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
    roomsNumber: Number.parseInt(roomsNumber, DECIMAL),
    gestNumber: Number.parseInt(gestNumber, DECIMAL),
    price: Number.parseFloat(price),
    features: features.split(';') as unknown as FeatureType[],
    user: { email, avatarPath, name, isPro },
    latitude: Number.parseInt(latitude, DECIMAL),
    longitude: Number.parseInt(longitude, DECIMAL)
  } as unknown as Offer;
}
