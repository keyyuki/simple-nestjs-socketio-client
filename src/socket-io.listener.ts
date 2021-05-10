import { Controller, Get } from '@nestjs/common';
import { MessagePattern, Payload, Ctx } from '@nestjs/microservices';
import { Socket } from 'socket.io-client';

@Controller()
export class SocketIoListener {
  @MessagePattern('welcome')
  handleSendHello(@Payload() data: string, @Ctx() client: Socket) {
    console.log('got welcome from server', data);
    const responseMessage = 'Ohayo';
    client.emit('greeting', responseMessage);
  }
}
