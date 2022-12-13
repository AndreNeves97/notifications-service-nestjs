import { Body, Controller, Get, Post } from '@nestjs/common';
import { PrismaService } from 'src/core/external/datasources/prisma/prisma.service';
import { randomUUID } from 'node:crypto';
import { CreateNotificationRequest } from './request/create-notification-request';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  findAll() {
    return this.prisma.notification.findMany();
  }

  @Post()
  async create(@Body() body: CreateNotificationRequest) {
    console.log({ body });

    const { recipientId, content, category } = body;

    const notification = await this.prisma.notification.create({
      data: {
        id: randomUUID(),
        content,
        category,
        recipientId,
      },
    });

    return notification;
  }
}
