import { Module } from '@nestjs/common';
import { CoreModule } from 'src/core/core.module';
import { NotificationsRepository } from './domain/repositories/notifications-repository.interface';
import { SendNotificationUsecase } from './domain/usecases/send-notification/send-notification.usecase';
import { InMemoryNotificationsRepository } from './infra/repositories/in-memory/in-memory-notifications-repository';
import { NotificationsController } from './presenter/api/notifications/notifications.controller';

@Module({
  providers: [
    SendNotificationUsecase,
    {
      provide: NotificationsRepository,
      useClass: InMemoryNotificationsRepository,
    },
  ],
  imports: [CoreModule],
  controllers: [NotificationsController],
})
export class NotificationsModule {}
