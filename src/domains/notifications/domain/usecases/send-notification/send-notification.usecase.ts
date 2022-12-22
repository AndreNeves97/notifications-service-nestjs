import { BaseUsecase } from '@core/domain/usecases/base-usecase';
import { Injectable } from '@nestjs/common';
import { Notification } from '../../entities/notification/notification.entity';
import { NotificationsRepository } from '../../repositories/notifications-repository.interface';

interface SendNotificationRequest {
  notification: Notification;
}

interface SendNotificationResponse {
  notification: Notification;
}

@Injectable()
export class SendNotificationUsecase
  implements BaseUsecase<SendNotificationRequest, SendNotificationResponse>
{
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
