import { Test, TestingModule } from '@nestjs/testing';
import { InMemoryNotificationsRepository } from './in-memory-notifications-repository';

describe('InMemoryNotificationsRepository', () => {
  let provider: InMemoryNotificationsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InMemoryNotificationsRepository],
    }).compile();

    provider = module.get<InMemoryNotificationsRepository>(
      InMemoryNotificationsRepository,
    );
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
