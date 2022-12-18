import { Injectable } from '@nestjs/common';
import { Notification } from '../../entities/notification/notification';
import { NotificationsRepository } from '../../repositories/notifications-repository.interface';

interface SendNotificationRequest {
  notification: Notification;
}

interface SendNotificationResponse {
  notification: Notification;
}

@Injectable()
export class SendNotificationUsecase {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
  ) {}

  async execute(
    request: SendNotificationRequest,
  ): Promise<SendNotificationResponse> {
    const notification = request.notification;

    await this.notificationsRepository.create(notification);

    return {
      notification,
    };
  }
}
