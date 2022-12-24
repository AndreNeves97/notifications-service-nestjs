import { BaseUsecase } from '@core/domain/usecases/base-usecase';
import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../../repositories/notifications-repository.interface';

interface CountRecipientNotificationsRequest {
  recipientId: string;
}

interface CountRecipientNotificationsResponse {
  count: number;
}

@Injectable()
export class CountRecipientNotificationsUsecase
  implements
    BaseUsecase<
      CountRecipientNotificationsRequest,
      CountRecipientNotificationsResponse
    >
{
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
  ) {}

  async execute(
    request: CountRecipientNotificationsRequest,
  ): Promise<CountRecipientNotificationsResponse> {
    const { recipientId } = request;

    const count = await this.notificationsRepository.countManyByRecipientId(
      recipientId,
    );

    return { count };
  }
}
