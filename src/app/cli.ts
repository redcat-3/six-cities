import { CliCommandInterface } from '../core/cli-command/cli-command.interface';

type ParsedCommand = Record<string, string[]>

export default class CLIApplication {
  private commands: Record<string, CliCommandInterface> = {};
  private readonly defaultCommand = '--help';

  private parseCommand(cliArguments: string[]): ParsedCommand {
    const parsedCommand: ParsedCommand = {};
    let command: string;

    return cliArguments.reduce((items, item) => {
      if (item.startsWith('--')) {
        items[item] = [];
        command = item;
      } else if (command && item) {
        items[command].push(item);
      }

      return items;
    }, parsedCommand);
  }

  public getCommand(commandName: string): CliCommandInterface {
    return this.commands[commandName] ?? this.commands[this.defaultCommand];
  }

  public processCommand(argv: string[]): void {
    const parsedCommand = this.parseCommand(argv);
    const [commandName] = Object.keys(parsedCommand);
    const command = this.getCommand(commandName);
    const commandArguments = parsedCommand[commandName] ?? [];
    command.execute(...commandArguments);
  }

  public registerCommands(commandList: CliCommandInterface[]): void {
    commandList.reduce((items, command) => {
      const cliCommand = command;
      items[cliCommand.name] = cliCommand;
      return items;
    }, this.commands);
  }

}
