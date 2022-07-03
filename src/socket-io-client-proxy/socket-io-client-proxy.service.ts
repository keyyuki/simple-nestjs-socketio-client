import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy, ReadPacket, WritePacket } from '@nestjs/microservices';
import { Subject } from 'rxjs';
import { timeout, take } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import { SocketIoClientProvider } from 'src/socket-io-client.provider';
import { RequestStoreProvider } from '../request-store.provider';

@Injectable()
export class SocketIoClientProxyService extends ClientProxy {
  @Inject(SocketIoClientProvider)
  private client: SocketIoClientProvider;

  @Inject(RequestStoreProvider)
  private requestStore: RequestStoreProvider;

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
    let data = packet.data;
    let requestId = '';
    if (typeof data.requestId === 'undefined') {
      requestId = uuidv4();
      data = {
        ...packet.data,
        requestId: requestId,
      };
    } else {
      requestId = packet.data.requestId;
    }
    const request$ = new Subject();
    this.requestStore.store.set(requestId, request$);
    this.requestStore.store
      .get(requestId)
      .pipe(timeout(30000), take(1))
      .subscribe({
        error: (err) => callback({ err }),
        next: (response) => {
          callback({ response });
        },
        complete: () => {
          this.requestStore.store.delete(requestId);
        },
      });

    this.client.getSocket().emit(packet.pattern, {
      ...packet.data,
      requestCustomId: requestId,
    });
    return () => {
      // Do not need anything here
    };
  }
}
