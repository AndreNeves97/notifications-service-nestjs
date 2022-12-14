import { Notification } from './notification';
import { NotificationContent } from './notification-content';

describe('Notification', () => {
  it('should be able to create a notification', () => {
    const notification = new Notification({
      content: new NotificationContent(
        'Você recebeu uma solicitação de amizade',
      ),
      category: 'social',
      recipientId: 'example-recipient-id',
      readAt: new Date(),
    });

    expect(notification).toBeTruthy();
  });
});
