import { Test, TestingModule } from '@nestjs/testing';
import { SocketIoClientProvider } from './socket-io-client.provider';

describe('SocketIoClientProvider', () => {
  let provider: SocketIoClientProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocketIoClientProvider],
    }).compile();

    provider = module.get<SocketIoClientProvider>(SocketIoClientProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
