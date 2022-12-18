import { Test, TestingModule } from '@nestjs/testing';
import { InMemoryNotificationsRepository } from '../../../infra/repositories/in-memory/in-memory-notifications-repository';
import { Notification } from '../../entities/notification/notification.entity';

import { NotificationContent } from '../../entities/notification/notification-content';
import { NotificationsRepository } from '../../repositories/notifications-repository.interface';
import { SendNotificationUsecase } from './send-notification.usecase';

describe('SendNotificationUsecase', () => {
  let usecase: SendNotificationUsecase;
  let repository: NotificationsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SendNotificationUsecase,
        {
          provide: NotificationsRepository,
          useClass: InMemoryNotificationsRepository,
        },
      ],
    }).compile();

    usecase = module.get<SendNotificationUsecase>(SendNotificationUsecase);
    repository = module.get<NotificationsRepository>(NotificationsRepository);
  });

  it('should be able to send a notification', async () => {
    const newNotification = new Notification({
      recipientId: 'example-id',
      content: new NotificationContent('This is a notification'),
      category: 'social',
    });

    const { notification } = await usecase.execute({
      notification: newNotification,
    });

    expect(notification).toBeTruthy();

    const notifications = await repository.findAll();
    expect(notifications).toHaveLength(1);
    expect(notifications[0]).toEqual(notification);
  });
});
