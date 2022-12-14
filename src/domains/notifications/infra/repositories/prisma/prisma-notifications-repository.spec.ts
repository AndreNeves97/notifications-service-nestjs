import { Test, TestingModule } from '@nestjs/testing';
import { CoreModule } from '../../../../../core/core.module';
import { PrismaNotificationsRepository } from './prisma-notifications-repository';

describe('PrismaNotificationsRepository', () => {
  let provider: PrismaNotificationsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CoreModule],
      providers: [PrismaNotificationsRepository],
    }).compile();

    provider = module.get<PrismaNotificationsRepository>(
      PrismaNotificationsRepository,
    );
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
