import { Module } from '@nestjs/common';
import { CoreModule } from 'src/core/core.module';
import { NotificationsController } from './presenter/api/notifications/notifications.controller';

@Module({
  imports: [CoreModule],
  controllers: [NotificationsController],
})
export class NotificationsModule {}
