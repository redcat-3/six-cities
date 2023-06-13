import dayjs from 'dayjs';
import { OfferGeneratorInterface } from './offer-generator.interface.js';
import { MockData } from '../../types/mock-data.type.js';
import { generateRandomValue, generateRandomValueLocation, getRandomItem, getRandomItems } from '../../core/helpers/index.js';
import { HOUSE_TYPES } from '../../../const.js';
import { AdultsNumber, Latitude, Longitude, Price, Rating, RoomsNumber, WeekDay } from '../offer/offer.constant.js';

const BOOLEANS = ['true', 'false'];

export default class OfferGenerator implements OfferGeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const city = getRandomItem<string>(this.mockData.cities);
    const previewImage = getRandomItem<string>(this.mockData.previewImages);
    const images = getRandomItems<string>(this.mockData.images).join(';');
    const isPremium = getRandomItem<string>(BOOLEANS);
    const isFavorite = getRandomItem<string>(BOOLEANS);
    const rating = generateRandomValue(Rating.Min, Rating.Max).toString();
    const type = getRandomItem(HOUSE_TYPES);
    const bedrooms = generateRandomValue(RoomsNumber.Min, RoomsNumber.Max).toString();
    const maxAdults = generateRandomValue(AdultsNumber.Min, AdultsNumber.Max).toString();
    const price = generateRandomValue(Price.Min, Price.Max).toString();
    const features = getRandomItems<string>(this.mockData.features).join(';');
    const avatarPath = getRandomItem<string>(this.mockData.avatarUrls);
    const name = getRandomItem<string>(this.mockData.names);
    const isPro = getRandomItem<string>(BOOLEANS);
    const latitude = generateRandomValueLocation(Latitude.Min, Latitude.Max).toString();
    const longitude = generateRandomValueLocation(Longitude.Min, Longitude.Max).toString();
    const createdDate = dayjs().subtract(generateRandomValue(WeekDay.First, WeekDay.Last), 'day').toISOString();

    return [
      title, description, createdDate,
      city, previewImage, images,
      avatarPath, name, isPro, latitude,
      longitude, type, price, isPremium, isFavorite,
      rating, bedrooms, maxAdults, features,
    ].join('\t');
  }
}
