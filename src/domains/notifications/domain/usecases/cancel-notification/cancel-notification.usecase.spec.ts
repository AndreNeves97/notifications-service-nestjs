import { InMemoryNotificationsRepository } from '@domains/notifications/infra/repositories/in-memory/in-memory-notifications-repository';
import { Test, TestingModule } from '@nestjs/testing';
import { NotificationNotFoundError } from '../../errors/notification-not-found-error';
import { NotificationsRepository } from '../../repositories/notifications-repository.interface';
import { CancelNotificationUsecase } from './cancel-notification.usecase';
import { NotificationFactory } from '../../factories/notification-factory/notification-factory';

describe('CancelNotificationUsecase', () => {
  let usecase: CancelNotificationUsecase;
  let repository: NotificationsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CancelNotificationUsecase,
        {
          provide: NotificationsRepository,
          useClass: InMemoryNotificationsRepository,
        },
      ],
    }).compile();

    usecase = module.get<CancelNotificationUsecase>(CancelNotificationUsecase);
    repository = module.get<NotificationsRepository>(NotificationsRepository);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  it('should be able to cancel a notification', async () => {
    const notification = NotificationFactory.makeMock();

    await repository.create(notification);

    await usecase.execute({
      notificationId: notification.id,
    });

    const notifications = await repository.findAll();
    expect(notifications[0].canceledAt).toEqual(expect.any(Date));
  });

  it('should not be able to cancel a non existing notification', async () => {
    expect(() => {
      return usecase.execute({
        notificationId: 'fake-notification',
      });
    }).rejects.toThrow(NotificationNotFoundError);
  });
});
