import { NotificationContent } from '../../entities/notification/notification-content';
import {
  Notification,
  NotificationProps,
} from '../../entities/notification/notification.entity';

export class NotificationFactory {
  public static makeMock(
    override: Partial<NotificationProps> = {},
  ): Notification {
    return new Notification({
      recipientId: 'example-recipient-id',
      content: new NotificationContent('This is a notification'),
      category: 'social',
      ...override,
    });
  }
}
