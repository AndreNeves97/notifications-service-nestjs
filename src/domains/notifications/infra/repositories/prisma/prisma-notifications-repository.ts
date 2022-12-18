import { Injectable } from '@nestjs/common';
import { NotificationContent } from '../../../domain/entities/notification/notification-content';
import { PrismaService } from '../../../../../core/external/datasources/prisma/prisma.service';
import { Notification } from '../../../domain/entities/notification/notification';
import { NotificationsRepository } from '../../../domain/repositories/notifications-repository.interface';
import { PrismaNotificationMapper } from './mappers/prisma-notification-mapper';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    const data = PrismaNotificationMapper.toPrisma(notification);

    await this.prismaService.notification.create({
      data,
    });
  }

  async findAll(): Promise<Notification[]> {
    const notifications = await this.prismaService.notification.findMany();

    return notifications.map((notification) => {
      const { category, content, recipientId, createdAt, readAt } =
        notification;

      return new Notification({
        category,
        content: new NotificationContent(content),
        recipientId,
        createdAt,
        readAt,
      });
    });
  }
}
