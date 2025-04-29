import { PrismaService } from 'src/prisma/prisma.service';

import { Injectable } from '@nestjs/common';

import { CreatePaymentDTO } from './dtos/create-payment.dto';
import { handleService } from 'src/common/utils/handleService';

@Injectable()
export class PaymentsService {
  constructor(private readonly prisma: PrismaService) {}

  getPayments() {
    return handleService(() => this.prisma.payment.findMany());
  }

  getPayment(id: string) {
    return handleService(() =>
      this.prisma.payment.findUnique({ where: { id } }),
    );
  }

  async createPayment(data: CreatePaymentDTO) {
    return handleService(() => this.prisma.payment.create({ data }));
  }
}
