import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsRepository } from '../../../domain/repositories/notifications-repository.interface';
import { GetNotificationsUsecase } from '../../../domain/usecases/get-notifications/get-notifications.usecase';
import { SendNotificationUsecase } from '../../../domain/usecases/send-notification/send-notification.usecase';
import { InMemoryNotificationsRepository } from '../../../infra/repositories/in-memory/in-memory-notifications-repository';
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
          useClass: InMemoryNotificationsRepository,
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
