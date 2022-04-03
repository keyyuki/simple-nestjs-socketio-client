import { Test, TestingModule } from '@nestjs/testing';
import { CommandStore } from './command-store';

describe('CommandStore', () => {
  let provider: CommandStore;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommandStore],
    }).compile();

    provider = module.get<CommandStore>(CommandStore);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
