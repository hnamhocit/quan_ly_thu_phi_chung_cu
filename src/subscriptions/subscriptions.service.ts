import { Injectable } from '@nestjs/common';
import { handleService } from 'src/common/utils/handleService';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSubscriptionDTO } from './dtos/create-subscription.dto';
import { UpdateSubscriptionDTO } from './dtos/update-subscription.dto';

@Injectable()
export class SubscriptionsService {
  constructor(private readonly prisma: PrismaService) {}

  getSubscriptions() {
    return handleService(() => this.prisma.subscription.findMany());
  }

  getSubscription(id: string) {
    return handleService(() =>
      this.prisma.subscription.findUnique({ where: { id } }),
    );
  }

  createSubscription(data: CreateSubscriptionDTO) {
    return handleService(() =>
      this.prisma.subscription.create({
        data: {
          ...data,
          status: 'active',
        },
      }),
    );
  }

  updateSubscription(id: string, data: UpdateSubscriptionDTO) {
    return handleService(() =>
      this.prisma.subscription.update({ where: { id }, data }),
    );
  }

  deleteSubscription(id: string) {
    return handleService(() =>
      this.prisma.subscription.delete({ where: { id } }),
    );
  }
}
