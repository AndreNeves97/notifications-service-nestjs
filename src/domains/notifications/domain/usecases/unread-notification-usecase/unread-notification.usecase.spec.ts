import { InMemoryNotificationsRepository } from '@domains/notifications/infra/repositories/in-memory/in-memory-notifications-repository';
import { Test, TestingModule } from '@nestjs/testing';
import { NotificationNotFoundError } from '../../errors/notification-not-found-error';
import { NotificationFactory } from '../../factories/notification-factory/notification-factory';
import { NotificationsRepository } from '../../repositories/notifications-repository.interface';
import { UnreadNotificationUsecase } from './unread-notification.usecase';

describe('UnreadNotificationUsecase', () => {
  let usecase: UnreadNotificationUsecase;
  let repository: NotificationsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UnreadNotificationUsecase,
        {
          provide: NotificationsRepository,
          useClass: InMemoryNotificationsRepository,
        },
      ],
    }).compile();

    usecase = module.get<UnreadNotificationUsecase>(UnreadNotificationUsecase);
    repository = module.get<NotificationsRepository>(NotificationsRepository);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  it('should be able to unread a notification', async () => {
    const notification = NotificationFactory.makeMock({ readAt: new Date() });

    await repository.create(notification);

    await usecase.execute({
      notificationId: notification.id,
    });

    const notifications = await repository.findAll();
    expect(notifications[0].readAt).toBeNull();
  });

  it('should not be able to unread a non existing notification', async () => {
    expect(() => {
      return usecase.execute({
        notificationId: 'fake-notification',
      });
    }).rejects.toThrow(NotificationNotFoundError);
  });
});
