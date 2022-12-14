import { Injectable } from '@nestjs/common';
import { Notification } from '../../entities/notification/notification';
import { NotificationContent } from '../../entities/notification/notification-content';
import { NotificationsRepository } from '../../repositories/notifications-repository.interface';

interface SendNotificationRequest {
  recipientId: string;
  content: string;
  category: string;
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
    const { recipientId, content, category } = request;

    const notification = new Notification({
      recipientId,
      content: new NotificationContent(content),
      category,
    });

    await this.notificationsRepository.create(notification);

    return {
      notification,
    };
  }
}
