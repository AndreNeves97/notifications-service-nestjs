import { Body, Controller, Get, Post } from '@nestjs/common';

import { CreateNotificationRequest } from './request/create-notification-request';
import { SendNotificationUsecase } from '../../../domain/usecases/send-notification/send-notification.usecase';
import { GetNotificationsUsecase } from '../../../domain/usecases/get-notifications-usecase/get-notifications.usecase';
import { Notification } from '../../../domain/entities/notification/notification';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly getNotificationsUsecase: GetNotificationsUsecase,
    private readonly sendNotificationUsecase: SendNotificationUsecase,
  ) {}

  @Get()
  async findAll(): Promise<Array<Notification>> {
    const { notifications } = await this.getNotificationsUsecase.execute();
    return notifications;
  }

  @Post()
  async create(@Body() body: CreateNotificationRequest) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotificationUsecase.execute({
      recipientId,
      content,
      category,
    });

    return { notification };
  }
}
