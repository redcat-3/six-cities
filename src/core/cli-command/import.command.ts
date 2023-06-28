import TSVFileReader from '../file-reader/tsv-file-reader.js';
import { CliCommandInterface } from './cli-command.interface.js';
import { createOffer, getErrorMessage, getMongoURI } from '../helpers/index.js';
import { UserServiceInterface } from '../../modules/user/user-service.interface.js';
import { OfferServiceInterface } from '../../modules/offer/offer-service.interface.js';
import { LoggerInterface } from '../logger/logger.interface.js';
import ConsoleLoggerService from '../logger/console.service.js';
import OfferService from '../../modules/offer/offer.service.js';
import UserService from '../../modules/user/user.service.js';
import { Offer } from '../../types/offer.type.js';
import { OfferModel, UserModel } from '../../modules/entities/index.js';
import { DatabaseClientInterface } from '../database-client/database-client.interface.js';
import { ConfigInterface } from '../config/config.interface.js';
import { RestSchema } from '../config/rest.schema.js';
import ConfigService from '../config/config.service.js';
import MongoClientService from '../database-client/mongo-client.service.js';

const DEFAULT_USER_PASSWORD = '123456';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';
  private config: ConfigInterface<RestSchema>;
  private userService!: UserServiceInterface;
  private offerService!: OfferServiceInterface;
  private databaseService!: DatabaseClientInterface;
  private logger: LoggerInterface;
  private salt!: string;

  constructor() {
    this.onLine = this.onLine.bind(this);
    this.onComplete = this.onComplete.bind(this);

    this.logger = new ConsoleLoggerService();
    this.offerService = new OfferService(this.logger, OfferModel, this.userService);
    this.userService = new UserService(this.logger, UserModel);
    this.config = new ConfigService(this.logger);
    this.databaseService = new MongoClientService(this.logger);
  }

  private async saveOffer(offer: Offer) {
    const user = await this.userService.findOrCreate({
      ...offer.user,
      password: DEFAULT_USER_PASSWORD
    }, this.salt);

    await this.offerService.createOffer({
      ...offer,
      userId: user.id,
    });
  }

  private async onLine(line: string, resolve: () => void) {
    const offer = createOffer(line);
    await this.saveOffer(offer);
    resolve();
  }

  private onComplete(count: number) {
    console.log(`${count} rows imported.`);
    this.databaseService.disconnect();
  }

  public async execute(filename: string, salt: string): Promise<void> {
    const mongoUri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );
    this.salt = salt;

    if(filename === undefined) {
      console.log('Filename is undefined');
    }

    await this.databaseService.connect(mongoUri);
    this.logger.info('Init database completed');
    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onLine);
    fileReader.on('end', this.onComplete);

    await fileReader
      .read()
      .catch((error) => {
        console.log(`Can't read file: ${getErrorMessage(error)}`);
      });
  }
}
