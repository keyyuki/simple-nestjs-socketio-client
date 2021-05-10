import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { SocketIoClientStrategy } from './socket-io-client.strategy';
import { SocketIoClientProvider } from './socket-io-client.provider';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig = app.get<ConfigService>(ConfigService);
  const socketIoClientProvider = app.get<SocketIoClientProvider>(
    SocketIoClientProvider,
  );

  app.connectMicroservice<MicroserviceOptions>({
    strategy: new SocketIoClientStrategy(socketIoClientProvider.getSocket()),
  });

  await app.startAllMicroservicesAsync();
  await app.listen(appConfig.get('APP_PORT'));
}
bootstrap();
