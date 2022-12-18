import { Injectable } from '@nestjs/common';
import { Notification } from '../../../domain/entities/notification/notification';
import { NotificationsRepository } from '../../../domain/repositories/notifications-repository.interface';

@Injectable()
export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  private notifications: Notification[] = [];

  async findAll() {
    return this.notifications;
  }

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = this.notifications.find(
      (notification) => notification.id === notificationId,
    );

    if (!notification) {
      return null;
    }

    return notification;
  }

  async create(notification: Notification) {
    this.notifications.push(notification);
  }

  async save(notification: Notification) {
    const notificationIndex = this.notifications.findIndex(
      (item) => item.id === notification.id,
    );

    if (notificationIndex < 0) {
      return;
    }

    this.notifications[notificationIndex] = notification;
  }
}
