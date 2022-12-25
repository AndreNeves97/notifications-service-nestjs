import { Test, TestingModule } from '@nestjs/testing';
import { CoreModule } from '../../../../../core/core.module';
import { InMemoryNotificationsRepository } from '../../../infra/repositories/in-memory/in-memory-notifications-repository';
import { NotificationFactory } from '../../factories/notification-factory/notification-factory';
import { NotificationsRepository } from '../../repositories/notifications-repository.interface';
import { GetNotificationsUsecase } from './get-notifications.usecase';

describe('GetNotificationsUsecase', () => {
  let usecase: GetNotificationsUsecase;
  let repository: NotificationsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CoreModule],
      providers: [
        GetNotificationsUsecase,
        {
          provide: NotificationsRepository,
          useClass: InMemoryNotificationsRepository,
        },
      ],
    }).compile();

    usecase = module.get<GetNotificationsUsecase>(GetNotificationsUsecase);
    repository = module.get<NotificationsRepository>(NotificationsRepository);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  it('should be able to get notifications', async () => {
    const createdNotifications = [
      NotificationFactory.makeMock({
        recipientId: 'example-recipient-id',
      }),
      NotificationFactory.makeMock({
        recipientId: 'example-recipient-id',
      }),
      NotificationFactory.makeMock({
        recipientId: 'new-recipient-id',
      }),
    ];

    const promises = createdNotifications.map((notification) =>
      repository.create(notification),
    );
    await Promise.all(promises);

    const { notifications } = await usecase.execute();

    expect(notifications).toHaveLength(3);
  });
});
