import { PrismaService } from 'src/prisma/prisma.service';

import { Injectable } from '@nestjs/common';

import { CreateNotificationDTO } from './dtos/create-nofication.dto';
import { handleService } from 'src/common/utils/handleService';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  async createNofication(data: CreateNotificationDTO) {
    return handleService(() => this.prisma.notification.create({ data }));
  }

  async getNotifications() {
    return handleService(() => this.prisma.notification.findMany());
  }

  async getNofication(id: string) {
    return handleService(() =>
      this.prisma.notification.findUnique({
        where: { id },
      }),
    );
  }
}
