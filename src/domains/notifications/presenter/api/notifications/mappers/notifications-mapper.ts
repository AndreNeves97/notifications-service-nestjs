import { Notification } from '@domains/notifications/domain/entities/notification/notification.entity';
import { NotificationContent } from '@domains/notifications/domain/entities/notification/notification-content';

import { CreateNotificationRequest } from '../request/create-notification-request';
import { NotificationProjection } from '../response/notification-projection';
import { NotificationPublicProjection } from '../response/notification-public-projection';

export class NotificationsMapper {
  public static fromRequest(request: CreateNotificationRequest): Notification {
    const { recipientId, content, category } = request;

    return new Notification({
      recipientId,
      content: new NotificationContent(content),
      category,
    });
  }

  public static toProjection(
    notification: Notification,
  ): NotificationProjection {
    return {
      id: notification.id,
      recipientId: notification.recipientId,
      category: notification.category,
      content: notification.content.value,
      readAt: notification.readAt,
      canceledAt: notification.canceledAt,
      createdAt: notification.createdAt,
    };
  }

  public static toPublicProjection(
    notification: Notification,
  ): NotificationPublicProjection {
    return {
      id: notification.id,
      recipientId: notification.recipientId,
      category: notification.category,
      content: notification.content.value,
      createdAt: notification.createdAt,
    };
  }
}
