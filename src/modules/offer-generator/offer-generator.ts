import dayjs from 'dayjs';
import { OfferGeneratorInterface } from './offer-generator.interface.js';
import { MockData } from '../../types/mock-data.type.js';
import { generateRandomValue, getRandomBoolean, getRandomItem, getRandomItems } from '../../core/helpers/index.js';
import { GestNumber, LOCATION_COUNT_DIGIT, Latitude, Longitude, PRICE_COUNT_DIGIT, Price, RATING_COUNT_DIGIT, Rating, RoomsNumber, WeekDay } from '../offer/offer.constant.js';

const HOUSE_TYPES = ['apartment', 'house', 'room', 'hotel'];
const USER_TYPE = ['pro', 'oбычный'];

export default class OfferGenerator implements OfferGeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const city = getRandomItem<string>(this.mockData.cities);
    const previewImage = getRandomItem<string>(this.mockData.previewImages);
    const images = getRandomItems<string>(this.mockData.images).join(';');
    const isPremium = getRandomBoolean();
    const rating = generateRandomValue(Rating.Min, Rating.Max, RATING_COUNT_DIGIT).toString();
    const type = getRandomItem(HOUSE_TYPES);
    const rooms = generateRandomValue(RoomsNumber.Min, RoomsNumber.Max, 0).toString();
    const gests = generateRandomValue(GestNumber.Min, GestNumber.Max, 0).toString();
    const price = generateRandomValue(Price.Min, Price.Max, PRICE_COUNT_DIGIT).toString();
    const features = getRandomItems<string>(this.mockData.features).join(';');
    const avatarPath = getRandomItem<string>(this.mockData.avatarUrls);
    const name = getRandomItem<string>(this.mockData.names);
    const isPro = getRandomItem<string>(USER_TYPE);
    const latitude = generateRandomValue(Latitude.Min, Latitude.Max, LOCATION_COUNT_DIGIT).toString();
    const longitude = generateRandomValue(Longitude.Min, Longitude.Max, LOCATION_COUNT_DIGIT).toString();
    const createdDate = dayjs().subtract(generateRandomValue(WeekDay.First, WeekDay.Last, 0), 'day').toISOString();

    return [
      title, description, createdDate,
      city, previewImage, images,
      avatarPath, name, isPro, latitude,
      longitude, type, price, isPremium,
      rating, rooms, gests, features,
    ].join('\t');
  }
}
