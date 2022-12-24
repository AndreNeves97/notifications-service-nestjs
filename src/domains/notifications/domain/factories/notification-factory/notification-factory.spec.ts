import { Notification } from '../../entities/notification/notification.entity';
import { NotificationFactory } from './notification-factory';

describe('NotificationFactory', () => {
  it('should be defined', () => {
    expect(new NotificationFactory()).toBeDefined();
  });

  it('should be able to create a default mock notification', () => {
    const notification = NotificationFactory.makeMock();
    expect(notification).toBeInstanceOf(Notification);
  });

  it('should be able to create a customized mock notification', () => {
    const notification = NotificationFactory.makeMock({
      recipientId: 'test-recipient-id',
    });

    expect(notification.recipientId).toEqual('test-recipient-id');
  });
});
