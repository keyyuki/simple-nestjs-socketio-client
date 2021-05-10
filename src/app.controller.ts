import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { SocketIoClientProxyService } from './socket-io-client-proxy/socket-io-client-proxy.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly socketIoClientProxyService: SocketIoClientProxyService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test-emit')
  testEmitAction() {
    this.socketIoClientProxyService.emit(
      'greeting',
      'Greeting from action test-emit',
    );
    return 'ok';
  }

  @Get('test-send')
  testSendAction() {
    this.socketIoClientProxyService
      .send('greeting', 'Greeting from action test-emit')
      .subscribe((rs) => {
        console.log('after send', rs);
      });
    return 'ok';
  }
}
