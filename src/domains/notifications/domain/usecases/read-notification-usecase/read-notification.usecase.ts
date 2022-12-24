import { BaseUsecase } from '@core/domain/usecases/base-usecase';
import { Injectable } from '@nestjs/common';
import { NotificationNotFoundError } from '../../errors/notification-not-found-error';
import { NotificationsRepository } from '../../repositories/notifications-repository.interface';

interface ReadNotificationRequest {
  notificationId: string;
}

type ReadNotificationResponse = void;

@Injectable()
export class ReadNotificationUsecase
  implements BaseUsecase<ReadNotificationRequest, ReadNotificationResponse>
{
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
  ) {}

  async execute(request: ReadNotificationRequest) {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFoundError();
    }

    notification.read();

    await this.notificationsRepository.save(notification);
  }
}
