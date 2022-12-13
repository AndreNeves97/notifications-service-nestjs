import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationsModule } from './domains/notifications/notifications.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [NotificationsModule, CoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
