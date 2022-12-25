import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

import { CreateNotificationRequest } from './request/create-notification-request';
import { GetNotificationsUsecase } from '../../../domain/usecases/get-notifications/get-notifications.usecase';
import { CountRecipientNotificationsUsecase } from '../../../domain/usecases/count-recipient-notifications-usecase/count-recipient-notifications.usecase';
import { GetRecipientNotificationsUsecase } from '../../../domain/usecases/get-recipient-notifications-usecase/get-recipient-notifications.usecase';
import { ReadNotificationUsecase } from '../../../domain/usecases/read-notification-usecase/read-notification.usecase';
import { UnreadNotificationUsecase } from '../../../domain/usecases/unread-notification-usecase/unread-notification.usecase';
import { SendNotificationUsecase } from '../../../domain/usecases/send-notification/send-notification.usecase';
import { CancelNotificationUsecase } from '../../../domain/usecases/cancel-notification/cancel-notification.usecase';
import { NotificationProjection } from './response/notification-projection';
import { NotificationsMapper } from './mappers/notifications-mapper';
import { NotificationPublicProjection } from './response/notification-public-projection';

interface SingleResponse {
  notification: NotificationProjection;
}

interface ListResponse {
  notifications: Array<NotificationProjection>;
}

interface ListPublicResponse {
  notifications: Array<NotificationPublicProjection>;
}

interface CountResponse {
  count: number;
}

@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly getNotificationsUsecase: GetNotificationsUsecase,
    private readonly getRecipientNotificationsUsecase: GetRecipientNotificationsUsecase,
    private readonly countRecipientNotificationsUsecase: CountRecipientNotificationsUsecase,
    private readonly sendNotificationUsecase: SendNotificationUsecase,
    private readonly cancelNotificationUsecase: CancelNotificationUsecase,
    private readonly readNotificationUsecase: ReadNotificationUsecase,
    private readonly unreadNotificationUsecase: UnreadNotificationUsecase,
  ) {}

  @Get()
  async getAll(): Promise<ListResponse> {
    const { notifications } = await this.getNotificationsUsecase.execute();

    return {
      notifications: notifications.map(NotificationsMapper.toProjection),
    };
  }

  @Get('recipients/:id')
  async getByRecipient(@Param('id') id: string): Promise<ListPublicResponse> {
    const { notifications } =
      await this.getRecipientNotificationsUsecase.execute({
        recipientId: id,
      });

    return {
      notifications: notifications.map(NotificationsMapper.toPublicProjection),
    };
  }

  @Get('recipients/:id/count')
  async countByRecipient(@Param('id') id: string): Promise<CountResponse> {
    const { count } = await this.countRecipientNotificationsUsecase.execute({
      recipientId: id,
    });

    return { count };
  }

  @Post()
  async create(
    @Body() body: CreateNotificationRequest,
  ): Promise<SingleResponse> {
    const newNotification = NotificationsMapper.fromRequest(body);

    const { notification } = await this.sendNotificationUsecase.execute({
      notification: newNotification,
    });

    return {
      notification: NotificationsMapper.toProjection(notification),
    };
  }

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string): Promise<void> {
    await this.cancelNotificationUsecase.execute({ notificationId: id });
  }

  @Patch(':id/read')
  async read(@Param('id') id: string): Promise<void> {
    await this.readNotificationUsecase.execute({ notificationId: id });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string): Promise<void> {
    await this.unreadNotificationUsecase.execute({ notificationId: id });
  }
}
