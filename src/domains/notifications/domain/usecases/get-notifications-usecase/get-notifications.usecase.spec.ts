import { Test, TestingModule } from '@nestjs/testing';
import { CoreModule } from '../../../../../core/core.module';
import { PrismaNotificationsRepository } from '../../../../../domains/notifications/infra/repositories/prisma/prisma-notifications-repository';
import { NotificationsRepository } from '../../repositories/notifications-repository.interface';
import { GetNotificationsUsecase } from './get-notifications.usecase';

describe('GetNotificationsUsecase', () => {
  let provider: GetNotificationsUsecase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CoreModule],
      providers: [
        GetNotificationsUsecase,
        {
          provide: NotificationsRepository,
          useClass: PrismaNotificationsRepository,
        },
      ],
    }).compile();

    provider = module.get<GetNotificationsUsecase>(GetNotificationsUsecase);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
