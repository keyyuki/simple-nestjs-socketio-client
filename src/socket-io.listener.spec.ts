import { Test, TestingModule } from '@nestjs/testing';
import { SocketIoListener } from './socket-io.listener';

describe('SocketIoListener', () => {
  let provider: SocketIoListener;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocketIoListener],
    }).compile();

    provider = module.get<SocketIoListener>(SocketIoListener);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
