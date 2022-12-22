import { BaseUsecase } from '@core/domain/usecases/base-usecase';
import { Injectable } from '@nestjs/common';
import { Notification } from '../../entities/notification/notification.entity';
import { NotificationsRepository } from '../../repositories/notifications-repository.interface';

type GetNotificationsRequest = void;

interface GetNotificationsResponse {
  notifications: Array<Notification>;
}

@Injectable()
export class GetNotificationsUsecase
  implements BaseUsecase<GetNotificationsRequest, GetNotificationsResponse>
{
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
  ) {}

  async execute(): Promise<GetNotificationsResponse> {
    const notifications = await this.notificationsRepository.findAll();

    return {
      notifications,
    };
  }
}
