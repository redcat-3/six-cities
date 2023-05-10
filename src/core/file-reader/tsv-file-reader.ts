import { readFileSync } from 'node:fs';
import { FileReaderInterface } from './file-reader.interface.js';
import { Offer } from '../../types/offer.type.js';

export default class TSVFileReader implements FileReaderInterface {
  private rawData = '';

  constructor(public filename: string) { }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      return [];
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('\t'))
      .map(([id, title, description, createdDate, city, previewImage, images, isPremium, isFavorite, rating, type, bedrooms, maxAdults, price, goods, hostId, avatarPath, name, isPro, latitude, longitude, zoom]) => ({
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
        goods: goods.split(';'),
        host: {id: Number.parseInt(hostId, 10), avatarPath, name, isPro: Boolean(isPro)},
        location: {latitude: Number.parseInt(latitude, 10), longitude: Number.parseInt(longitude, 10), zoom: Number.parseInt(zoom, 10)}
      }));
  }
}
