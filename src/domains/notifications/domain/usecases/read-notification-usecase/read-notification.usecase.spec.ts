import { InMemoryNotificationsRepository } from '@domains/notifications/infra/repositories/in-memory/in-memory-notifications-repository';
import { Test, TestingModule } from '@nestjs/testing';
import { NotificationNotFoundError } from '../../errors/notification-not-found-error';
import { NotificationFactory } from '../../factories/notification-factory/notification-factory';
import { NotificationsRepository } from '../../repositories/notifications-repository.interface';
import { ReadNotificationUsecase } from './read-notification.usecase';

describe('ReadNotificationUsecase', () => {
  let usecase: ReadNotificationUsecase;
  let repository: NotificationsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReadNotificationUsecase,
        {
          provide: NotificationsRepository,
          useClass: InMemoryNotificationsRepository,
        },
      ],
    }).compile();

    usecase = module.get<ReadNotificationUsecase>(ReadNotificationUsecase);
    repository = module.get<NotificationsRepository>(NotificationsRepository);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  it('should be able to read a notification', async () => {
    const notification = NotificationFactory.makeMock();

    await repository.create(notification);

    await usecase.execute({
      notificationId: notification.id,
    });

    const notifications = await repository.findAll();
    expect(notifications[0].readAt).toEqual(expect.any(Date));
  });

  it('should not be able to read a non existing notification', async () => {
    expect(() => {
      return usecase.execute({
        notificationId: 'fake-notification',
      });
    }).rejects.toThrow(NotificationNotFoundError);
  });
});
