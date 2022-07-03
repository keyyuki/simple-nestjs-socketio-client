import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocketIoListener } from './socket-io.listener';
import { SocketIoClientProvider } from './socket-io-client.provider';
import { SocketIoClientProxyService } from './socket-io-client-proxy/socket-io-client-proxy.service';
import { RequestStoreProvider } from './request-store.provider';
import { Boostrap } from './boostrap';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, SocketIoListener],
  providers: [
    AppService,
    SocketIoClientProvider,
    SocketIoClientProxyService,
    RequestStoreProvider,
    Boostrap,
  ],
})
export class AppModule {}
