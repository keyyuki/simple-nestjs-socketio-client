import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy, ReadPacket, WritePacket } from '@nestjs/microservices';
import { SocketIoClientProvider } from 'src/socket-io-client.provider';
import { CommandStore } from '../command-store';

@Injectable()
export class SocketIoClientProxyService extends ClientProxy {
  @Inject(SocketIoClientProvider)
  private client: SocketIoClientProvider;

  @Inject(CommandStore)
  private commandStore: CommandStore;

  async connect(): Promise<any> {
    this.client.getSocket();
    console.log('connect client proxy');
  }

  async close() {
    this.client.getSocket().disconnect();
    console.log('connect client proxy');
  }

  /**
   * this method use when you use SocketIoClientProxyService.emit
   * @param packet
   * @returns
   */
  async dispatchEvent(packet: ReadPacket<any>): Promise<any> {
    this.client.getSocket().emit(packet.pattern, packet.data);
    return;
  }

  /**
   * this method will be call when use SocketIoClientProxyService.send
   * can be use to implement request-response
   * @param packet
   * @param callback
   * @returns
   */
  publish(
    packet: ReadPacket<any>,
    callback: (packet: WritePacket<any>) => void,
  ): CallableFunction {
    const command = this.commandStore.produceNewCommand();
    command.promise
      .then((rs: unknown) => callback({ response: rs }))
      .catch((err) => callback({ err }));
    this.client.getSocket().emit(packet.pattern, {
      ...packet.data,
      requestCustomId: command.id,
    });
    return () => {
      // Do not need anything here
    };
  }
}
