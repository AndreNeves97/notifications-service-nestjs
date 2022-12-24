import { BaseUsecase } from '@core/domain/usecases/base-usecase';
import { Injectable } from '@nestjs/common';
import { NotificationNotFoundError } from '../../errors/notification-not-found-error';
import { NotificationsRepository } from '../../repositories/notifications-repository.interface';

interface UnreadNotificationRequest {
  notificationId: string;
}

type UnreadNotificationResponse = void;

@Injectable()
export class UnreadNotificationUsecase
  implements BaseUsecase<UnreadNotificationRequest, UnreadNotificationResponse>
{
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
  ) {}

  async execute(request: UnreadNotificationRequest) {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFoundError();
    }

    notification.unread();

    await this.notificationsRepository.save(notification);
  }
}
