import { Injectable } from '@nestjs/common';
import { Notification } from '../../entities/notification/notification';
import { NotificationsRepository } from '../../repositories/notifications-repository.interface';

interface GetNotificationsResponse {
  notifications: Array<Notification>;
}

@Injectable()
export class GetNotificationsUsecase {
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
