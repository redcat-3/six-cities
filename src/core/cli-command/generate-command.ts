import got from 'got';
import { CliCommandInterface } from './cli-command.interface.js';
import { MockData } from '../../types/mock-data.type.js';
import OfferGenerator from '../../modules/offer-generator/offer-generator.js';
import TSVFileWriter from '../file-writer/tsv-file-writer.js';
import { DECIMAL } from '../../modules/offer/offer.constant.js';

export default class GenerateCommand implements CliCommandInterface {
  public readonly name = '--generate';
  private initialData!: MockData;

  public async execute(...parameters:string[]): Promise<void> {
    const [count, filePath, url] = parameters;
    const offerCount = Number.parseInt(count, DECIMAL);
    this.initialData = await got.get(url)
      .json()
      .then((data: unknown) => data as MockData)
      .catch((error) => {
        console.log(error);
        return {} as MockData;
      });
    const offerGeneratorString = new OfferGenerator(this.initialData);
    const tsvFileWriter = new TSVFileWriter(filePath);
    for (let i = 0; i < offerCount; i++) {
      await tsvFileWriter.write(offerGeneratorString.generate());
    }
    console.log(`File ${filePath} was created!`);
  }
}
