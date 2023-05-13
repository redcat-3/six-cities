import dayjs from 'dayjs';
import { OfferGeneratorInterface } from './offer-generator.interface.js';
import { MockData } from '../../types/mock-data.type.js';
import { generateRandomValue, generateRandomValueLocation, getRandomItem, getRandomItems } from '../../core/helpers/index.js';
import { HOUSE_TYPES } from '../../../const.js';

let firstId = 1;
const BOOLEAN = ['true', 'false'];

const MIN_RATING = 1;
const MAX_RATING = 5;

const MIN_NUMBER_ROOMS = 1;
const MAX_NUMBER_ROOMS = 8;

const MIN_ADULTS = 1;
const MAX_ADULTS = 8;

const MIN_PRICE = 100;
const MAX_PRICE = 100000;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

const MIN_LAT = 40;
const MAX_LAT = 55;

const MIN_LG = 40;
const MAX_LG = 55;

export default class OfferGenerator implements OfferGeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  public generate(): string {
    firstId++;
    const id = firstId.toString();
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const city = getRandomItem<string>(this.mockData.cities);
    const previewImage = getRandomItem<string>(this.mockData.previewImages);
    const images = getRandomItems<string>(this.mockData.images).join(';');
    const isPremium = getRandomItem<string>(BOOLEAN);
    const isFavorite = getRandomItem<string>(BOOLEAN);
    const rating = generateRandomValue(MIN_RATING, MAX_RATING).toString();
    const type = getRandomItem(HOUSE_TYPES);
    const bedrooms = generateRandomValue(MIN_NUMBER_ROOMS, MAX_NUMBER_ROOMS).toString();
    const maxAdults = generateRandomValue(MIN_ADULTS, MAX_ADULTS).toString();
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const features = getRandomItems<string>(this.mockData.features).join(';');
    const hostId = id;
    const avatarPath = getRandomItem<string>(this.mockData.avatarUrls);
    const name = getRandomItem<string>(this.mockData.names);
    const isPro = getRandomItem<string>(BOOLEAN);
    const latitude = generateRandomValueLocation(MIN_LAT, MAX_LAT).toString();
    const longitude = generateRandomValueLocation(MIN_LG, MAX_LG).toString();
    const createdDate = dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();

    return [
      id, title, description, createdDate,
      city, previewImage, images, hostId,
      avatarPath, name, isPro, latitude,
      longitude, type, price, isPremium, isFavorite,
      rating, bedrooms, maxAdults, features,
    ].join('\t');
  }
}
