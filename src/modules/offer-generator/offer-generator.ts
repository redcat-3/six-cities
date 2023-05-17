import dayjs from 'dayjs';
import { OfferGeneratorInterface } from './offer-generator.interface.js';
import { MockData } from '../../types/mock-data.type.js';
import { generateRandomValue, generateRandomValueLocation, getRandomItem, getRandomItems } from '../../core/helpers/index.js';
import { HOUSE_TYPES } from '../../../const.js';

let firstId = 1;
const BOOLEAN = ['true', 'false'];

const Rating = {
  Min: 1,
  Max: 5
};

const Price = {
  Min: 100,
  Max: 100000
};

const NumberRomms = {
  Min: 1,
  Max: 8
};

const Adults = {
  Min: 1,
  Max: 8
};

const Lat = {
  Min: 40,
  Max: 50
};

const Lg = {
  Min: 4,
  Max: 6
};

const WeekDay = {
  First: 1,
  Last: 7
};

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
    const rating = generateRandomValue(Rating.Min, Rating.Max).toString();
    const type = getRandomItem(HOUSE_TYPES);
    const bedrooms = generateRandomValue(NumberRomms.Min, NumberRomms.Max).toString();
    const maxAdults = generateRandomValue(Adults.Min, Adults.Max).toString();
    const price = generateRandomValue(Price.Min, Price.Max).toString();
    const features = getRandomItems<string>(this.mockData.features).join(';');
    const hostId = id;
    const avatarPath = getRandomItem<string>(this.mockData.avatarUrls);
    const name = getRandomItem<string>(this.mockData.names);
    const isPro = getRandomItem<string>(BOOLEAN);
    const latitude = generateRandomValueLocation(Lat.Min, Lat.Max).toString();
    const longitude = generateRandomValueLocation(Lg.Min, Lg.Max).toString();
    const createdDate = dayjs().subtract(generateRandomValue(WeekDay.First, WeekDay.Last), 'day').toISOString();

    return [
      id, title, description, createdDate,
      city, previewImage, images, hostId,
      avatarPath, name, isPro, latitude,
      longitude, type, price, isPremium, isFavorite,
      rating, bedrooms, maxAdults, features,
    ].join('\t');
  }
}
