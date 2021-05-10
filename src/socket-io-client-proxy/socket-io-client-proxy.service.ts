import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy, ReadPacket, WritePacket } from '@nestjs/microservices';
import { SocketIoClientProvider } from 'src/socket-io-client.provider';

@Injectable()
export class SocketIoClientProxyService extends ClientProxy {
  @Inject(SocketIoClientProvider)
  private client: SocketIoClientProvider;

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
  ): Function {
    console.log('message:', packet);

    // In a real-world application, the "callback" function should be executed
    // with payload sent back from the responder. Here, we'll simply simulate (5 seconds delay)
    // that response came through by passing the same "data" as we've originally passed in.
    setTimeout(() => callback({ response: packet.data }), 5000);

    return () => console.log('teardown');
  }
}
