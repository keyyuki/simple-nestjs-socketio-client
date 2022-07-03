import { Test, TestingModule } from '@nestjs/testing';
import { RequestStoreProvider } from './request-store.provider';

describe('RequestStoreProvider', () => {
  let service: RequestStoreProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestStoreProvider],
    }).compile();

    service = module.get<RequestStoreProvider>(RequestStoreProvider);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
