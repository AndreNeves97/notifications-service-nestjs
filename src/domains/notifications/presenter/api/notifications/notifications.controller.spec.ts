import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsRepository } from '../../../../../domains/notifications/domain/repositories/notifications-repository.interface';
import { GetNotificationsUsecase } from '../../../../../domains/notifications/domain/usecases/get-notifications-usecase/get-notifications.usecase';
import { SendNotificationUsecase } from '../../../../../domains/notifications/domain/usecases/send-notification/send-notification.usecase';
import { PrismaNotificationsRepository } from '../../../../../domains/notifications/infra/repositories/prisma/prisma-notifications-repository';
import { CoreModule } from '../../../../../core/core.module';
import { NotificationsController } from './notifications.controller';

describe('NotificationsController', () => {
  let controller: NotificationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CoreModule],
      providers: [
        GetNotificationsUsecase,
        SendNotificationUsecase,
        {
          provide: NotificationsRepository,
          useClass: PrismaNotificationsRepository,
        },
      ],
      controllers: [NotificationsController],
    }).compile();

    controller = module.get<NotificationsController>(NotificationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
