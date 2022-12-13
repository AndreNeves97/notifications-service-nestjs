import { Module } from '@nestjs/common';
import { PrismaService } from './external/datasources/prisma/prisma.service';

@Module({ providers: [PrismaService], exports: [PrismaService] })
export class CoreModule {}
