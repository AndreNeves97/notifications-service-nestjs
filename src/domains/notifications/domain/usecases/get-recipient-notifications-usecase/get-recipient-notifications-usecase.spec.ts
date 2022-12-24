import { InMemoryNotificationsRepository } from '@domains/notifications/infra/repositories/in-memory/in-memory-notifications-repository';
import { Test, TestingModule } from '@nestjs/testing';
import { NotificationFactory } from '../../factories/notification-factory/notification-factory';
import { NotificationsRepository } from '../../repositories/notifications-repository.interface';
import { GetRecipientNotificationsUsecase } from './get-recipient-notifications-usecase';

describe('GetRecipientNotificationsUsecase', () => {
  let usecase: GetRecipientNotificationsUsecase;
  let repository: NotificationsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetRecipientNotificationsUsecase,
        {
          provide: NotificationsRepository,
          useClass: InMemoryNotificationsRepository,
        },
      ],
    }).compile();

    usecase = module.get<GetRecipientNotificationsUsecase>(
      GetRecipientNotificationsUsecase,
    );
    repository = module.get<NotificationsRepository>(NotificationsRepository);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  it('should be able to get recipient notifications', async () => {
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

    const { notifications } = await usecase.execute({
      recipientId: 'example-recipient-id',
    });

    expect(notifications).toHaveLength(2);

    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'example-recipient-id' }),
      ]),
    );
  });
});
