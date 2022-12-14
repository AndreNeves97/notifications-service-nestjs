import { Injectable } from '@nestjs/common';
import { Notification } from '../../../domain/entities/notification/notification';
import { NotificationsRepository } from '../../../domain/repositories/notifications-repository.interface';

@Injectable()
export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  private notifications: Notification[] = [];

  async create(notification: Notification) {
    this.notifications.push(notification);
  }

  async findAll(): Promise<Notification[]> {
    return this.notifications;
  }
}
