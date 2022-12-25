import { Notification } from './notification.entity';
import { NotificationContent } from './notification-content';

describe('Notification', () => {
  it('should be able to create a notification', () => {
    const notification = new Notification({
      content: new NotificationContent('You have received a friend request'),
      category: 'social',
      recipientId: 'example-recipient-id',
      readAt: new Date(),
    });

    expect(notification).toBeTruthy();
  });

  it('should define a default createdAt value', () => {
    const notification = new Notification({
      content: new NotificationContent('Notification content'),
      category: 'social',
      recipientId: 'example-recipient-id',
      readAt: new Date(),
    });

    expect(notification.createdAt).toEqual(expect.any(Date));
  });

  it('should hold a received createdAt value', () => {
    const createdAt = new Date('2022-12-01');

    const notification = new Notification({
      content: new NotificationContent('Notification content'),
      category: 'social',
      recipientId: 'example-recipient-id',
      readAt: new Date(),
      createdAt,
    });

    expect(notification.createdAt).toEqual(createdAt);
  });

  it('should define a default id value', () => {
    const notification = new Notification({
      content: new NotificationContent('Notification content'),
      category: 'social',
      recipientId: 'example-recipient-id',
      readAt: new Date(),
    });

    expect(notification.id).toEqual(expect.any(String));
  });

  it('should hold a received id value', () => {
    const id = 'abcdef';

    const notification = new Notification({
      id,
      content: new NotificationContent('Notification content'),
      category: 'social',
      recipientId: 'example-recipient-id',
      readAt: new Date(),
    });

    expect(notification.id).toEqual(id);
  });
});
