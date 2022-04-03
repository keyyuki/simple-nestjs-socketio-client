import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { SocketIoClientStrategy } from './socket-io-client.strategy';
import { SocketIoClientProvider } from './socket-io-client.provider';
import { CommandStore } from './command-store';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig = app.get<ConfigService>(ConfigService);
  const socketIoClientProvider = app.get<SocketIoClientProvider>(
    SocketIoClientProvider,
  );
  const commandStore = app.get<CommandStore>(CommandStore);

  app.connectMicroservice<MicroserviceOptions>({
    strategy: new SocketIoClientStrategy(
      socketIoClientProvider.getSocket(),
      commandStore,
    ),
  });

  await app.startAllMicroservicesAsync();
  await app.listen(appConfig.get('APP_PORT'));
}
bootstrap();
