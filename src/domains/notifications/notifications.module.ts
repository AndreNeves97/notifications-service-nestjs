import { Module } from '@nestjs/common';
import { CoreModule } from 'src/core/core.module';
import { NotificationsRepository } from './domain/repositories/notifications-repository.interface';
import { CancelNotificationUsecase } from './domain/usecases/cancel-notification/cancel-notification.usecase';
import { GetNotificationsUsecase } from './domain/usecases/get-notifications/get-notifications.usecase';
import { SendNotificationUsecase } from './domain/usecases/send-notification/send-notification.usecase';
import { PrismaNotificationsRepository } from './infra/repositories/prisma/prisma-notifications-repository';
import { NotificationsController } from './presenter/api/notifications/notifications.controller';

@Module({
  providers: [
    GetNotificationsUsecase,
    SendNotificationUsecase,
    CancelNotificationUsecase,
    {
      provide: NotificationsRepository,
      useClass: PrismaNotificationsRepository,
    },
  ],
  imports: [CoreModule],
  controllers: [NotificationsController],
})
export class NotificationsModule {}
