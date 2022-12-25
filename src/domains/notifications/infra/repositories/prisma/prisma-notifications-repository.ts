import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../core/external/datasources/prisma/prisma.service';
import { Notification } from '../../../domain/entities/notification/notification.entity';
import { NotificationsRepository } from '../../../domain/repositories/notifications-repository.interface';
import { PrismaNotificationMapper } from './mappers/prisma-notification-mapper';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  get notifications() {
    return this.prismaService.notification;
  }

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = await this.notifications.findUnique({
      where: {
        id: notificationId,
      },
    });

    if (!notification) {
      return null;
    }

    return PrismaNotificationMapper.fromRaw(notification);
  }

  async findAll(): Promise<Notification[]> {
    const notifications = await this.notifications.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    });

    return notifications.map(PrismaNotificationMapper.fromRaw);
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = await this.notifications.findMany({
      where: {
        recipientId,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return notifications.map(PrismaNotificationMapper.fromRaw);
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    const count = await this.notifications.count({
      where: {
        recipientId,
      },
    });

    return count;
  }

  async create(notification: Notification): Promise<void> {
    const data = PrismaNotificationMapper.toRaw(notification);

    await this.notifications.create({
      data,
    });
  }

  async save(notification: Notification): Promise<void> {
    const data = PrismaNotificationMapper.toRaw(notification);

    await this.notifications.update({
      where: {
        id: data.id,
      },
      data,
    });
  }
}
