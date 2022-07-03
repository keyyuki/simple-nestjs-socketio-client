import { Test, TestingModule } from '@nestjs/testing';
import { Boostrap } from './boostrap';

describe('Boostrap', () => {
  let provider: Boostrap;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Boostrap],
    }).compile();

    provider = module.get<Boostrap>(Boostrap);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
