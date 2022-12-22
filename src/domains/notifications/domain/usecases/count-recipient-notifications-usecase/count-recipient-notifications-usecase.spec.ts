import { InMemoryNotificationsRepository } from '@domains/notifications/infra/repositories/in-memory/in-memory-notifications-repository';
import { Test, TestingModule } from '@nestjs/testing';
import { NotificationContent } from '../../entities/notification/notification-content';
import { Notification } from '../../entities/notification/notification.entity';
import { NotificationsRepository } from '../../repositories/notifications-repository.interface';
import { CountRecipientNotificationsUsecase } from './count-recipient-notifications-usecase';

describe('CountRecipientNotificationsUsecase', () => {
  let usecase: CountRecipientNotificationsUsecase;
  let repository: NotificationsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CountRecipientNotificationsUsecase,
        {
          provide: NotificationsRepository,
          useClass: InMemoryNotificationsRepository,
        },
      ],
    }).compile();

    usecase = module.get<CountRecipientNotificationsUsecase>(
      CountRecipientNotificationsUsecase,
    );
    repository = module.get<NotificationsRepository>(NotificationsRepository);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  it('should be able to count recipient notifications', async () => {
    const notifications = [
      new Notification({
        recipientId: 'example-recipient-id',
        content: new NotificationContent('This is a notification'),
        category: 'social',
      }),
      new Notification({
        recipientId: 'example-recipient-id',
        content: new NotificationContent('This is another notification'),
        category: 'social',
      }),
      new Notification({
        recipientId: 'new-recipient-id',
        content: new NotificationContent(
          'This is a notification for another recipient',
        ),
        category: 'social',
      }),
    ];

    const promises = notifications.map((notification) =>
      repository.create(notification),
    );
    await Promise.all(promises);

    const { count } = await usecase.execute({
      recipientId: 'example-recipient-id',
    });

    expect(count).toEqual(2);
  });
});
