import { CliCommandInterface } from './cli-command.interface.js';
import chalk from 'chalk';

export default class HelpCommand implements CliCommandInterface {
  public readonly name = '--help';

  public async execute(): Promise<void> {
    console.log(chalk.bgBlue('Программа для подготовки данных для REST API сервера.'));
    console.log(chalk.bgGreen(`Пример:
    main.js --<command> [--arguments]
    `));
    console.log(chalk.yellow(`Команды:
    --version:                   # выводит номер версии
    --help:                      # печатает этот текст
    --import <path>:             # импортирует данные из TSV
    --generate <n> <path> <url>  # генерирует произвольное количество тестовых данных
`));
  }
}
