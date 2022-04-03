import { Injectable } from '@nestjs/common';
import { Command, commandFactory } from './command/command';
import { timer } from 'rxjs';

@Injectable()
export class CommandStore {
  private commandMap = new Map<string, Command>();
  private timeoutCommand = 10000;

  produceNewCommand() {
    const command = commandFactory();
    this.commandMap.set(command.id, command);

    // auto reject command with reason timeout after timeoutCommand
    timer(this.timeoutCommand).subscribe(() => {
      if (this.commandMap.has(command.id)) {
        command.reject('Timeout');
        this.commandMap.delete(command.id);
      }
    });
    return command;
  }

  resolveCommand(id: string, data: unknown) {
    const command = this.commandMap.get(id);
    if (command) {
      this.commandMap.delete(id);
      command.resolve(data);
    }
  }

  rejectCommand(id: string, reason: unknown) {
    const command = this.commandMap.get(id);
    if (command) {
      this.commandMap.delete(id);
      command.reject(reason);
    }
  }
}
