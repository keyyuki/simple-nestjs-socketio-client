import { Test, TestingModule } from '@nestjs/testing';
import { SocketIoClientProxyService } from './socket-io-client-proxy.service';

describe('SocketIoClientProxyService', () => {
  let service: SocketIoClientProxyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocketIoClientProxyService],
    }).compile();

    service = module.get<SocketIoClientProxyService>(SocketIoClientProxyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
