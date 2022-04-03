import { CustomTransportStrategy, Server } from '@nestjs/microservices';
import { Socket } from 'socket.io-client';
import { CommandStore } from './command-store';

export class SocketIoClientStrategy
  extends Server
  implements CustomTransportStrategy {
  constructor(private client: Socket, private commandStore: CommandStore) {
    super();
  }

  /**
   * This method is triggered when you run "app.listen()".
   */
  listen(callback: () => void) {
    this.client.on('connection', () => {
      console.log('connect');
    });
    this.client.on('error', (error) => {
      console.log(error);
    });

    this.messageHandlers.forEach((handler, pattern) => {
      this.client.on(pattern, (data: any) => {
        handler(data, this.client);

        // resolve command
        if (data && typeof data['requestCustomId'] === 'string') {
          this.commandStore.resolveCommand(data['requestCustomId'], data);
        }
      });
    });

    callback();
  }

  /**
   * This method is triggered on application shutdown.
   */
  close() {
    this.client.disconnect();
  }
}
