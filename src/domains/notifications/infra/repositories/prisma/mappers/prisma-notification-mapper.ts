import { NotificationContent } from '@domains/notifications/domain/entities/notification/notification-content';
import { Notification } from '@domains/notifications/domain/entities/notification/notification.entity';
import { Notification as RawNotification } from '@prisma/client';

export class PrismaNotificationMapper {
  public static fromRaw(raw: RawNotification): Notification {
    const {
      id,
      recipientId,
      content,
      category,
      readAt,
      canceledAt,
      createdAt,
    } = raw;

    return new Notification({
      id,
      recipientId,
      content: new NotificationContent(content),
      category,
      readAt,
      canceledAt,
      createdAt,
    });
  }

  public static toRaw(notification: Notification): RawNotification {
    return {
      id: notification.id,
      recipientId: notification.recipientId,
      content: notification.content.value,
      category: notification.category,
      readAt: notification.readAt ?? null,
      createdAt: notification.createdAt,
      canceledAt: notification.canceledAt ?? null,
    };
  }
}
