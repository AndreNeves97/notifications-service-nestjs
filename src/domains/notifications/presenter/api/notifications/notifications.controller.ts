import { Body, Controller, Get, Post } from '@nestjs/common';

import { CreateNotificationRequest } from './request/create-notification-request';
import { SendNotificationUsecase } from '../../../domain/usecases/send-notification/send-notification.usecase';
import { GetNotificationsUsecase } from '../../../domain/usecases/get-notifications-usecase/get-notifications.usecase';
import { NotificationProjection } from './response/notification-projection';
import { NotificationsMapper } from './mappers/notifications-mapper';

interface SingleResponse {
  notification: NotificationProjection;
}

interface ListResponse {
  notifications: Array<NotificationProjection>;
}

@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly getNotificationsUsecase: GetNotificationsUsecase,
    private readonly sendNotificationUsecase: SendNotificationUsecase,
  ) {}

  @Get()
  async findAll(): Promise<ListResponse> {
    const { notifications } = await this.getNotificationsUsecase.execute();

    return {
      notifications: notifications.map(NotificationsMapper.toProjection),
    };
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
}
