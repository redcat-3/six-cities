import { readFile } from 'node:fs/promises';
import { CliCommandInterface } from './cli-command.interface.js';
import chalk from 'chalk';

export default class VersionCommand implements CliCommandInterface {
  public readonly name = '--version';

  private async readVersion(): Promise<string> {
    const contentPageJSON = await readFile('./package.json', 'utf-8');
    const content = JSON.parse(contentPageJSON);
    return content.version;
  }

  public async execute(): Promise<void> {
    const version = await this.readVersion();
    console.log(chalk.blue(version));
  }
}
