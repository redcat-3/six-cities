import dayjs from 'dayjs';
import { OfferGeneratorInterface } from './offer-generator.interface.js';
import { MockData } from '../../types/mock-data.type.js';
import { generateRandomValue, getRandomBoolean, getRandomItem, getRandomItems } from '../../core/helpers/index.js';
import { LATITUDE, LOCATION_COUNT_DIGIT, LONGITUDE, GEST_NUMBER, ROOMS_NUMBER, PRICE, PRICE_COUNT_DIGIT, WEEK_DAY } from '../offer/offer.constant.js';

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
    const type = getRandomItem(HOUSE_TYPES);
    const rooms = generateRandomValue(ROOMS_NUMBER.MIN, ROOMS_NUMBER.MAX, 0).toString();
    const gests = generateRandomValue(GEST_NUMBER.MIN, GEST_NUMBER.MAX, 0).toString();
    const price = generateRandomValue(PRICE.MIN, PRICE.MAX, PRICE_COUNT_DIGIT).toString();
    const features = getRandomItems<string>(this.mockData.features).join(';');
    const email = getRandomItem<string>(this.mockData.emails);
    const avatarPath = getRandomItem<string>(this.mockData.avatarUrls);
    const name = getRandomItem<string>(this.mockData.names);
    const isPro = getRandomItem<string>(USER_TYPE);
    const latitude = generateRandomValue(LATITUDE.MIN, LATITUDE.MAX, LOCATION_COUNT_DIGIT).toString();
    const longitude = generateRandomValue(LONGITUDE.MIN, LONGITUDE.MAX, LOCATION_COUNT_DIGIT).toString();
    const createdDate = dayjs().subtract(generateRandomValue(WEEK_DAY.FIRST, WEEK_DAY.LAST, 0), 'day').toISOString();
    return [
      title,
      description,
      createdDate,
      city,
      previewImage,
      images,
      isPremium,
      type,
      rooms,
      gests,
      price,
      features,
      email,
      avatarPath,
      name,
      isPro,
      latitude,
      longitude
    ].join('\t');
  }
}
