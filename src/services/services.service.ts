import { PrismaService } from 'src/prisma/prisma.service';

import { Injectable } from '@nestjs/common';

import { CreateServiceDTO } from './dtos/create-service.dto';
import { UpdateServiceDTO } from './dtos/update-service.dto';
import { handleService } from 'src/common/utils/handleService';

@Injectable()
export class ServicesService {
  constructor(private readonly prisma: PrismaService) {}

  getServices() {
    return handleService(() => this.prisma.service.findMany());
  }

  getService(id: string) {
    return handleService(() =>
      this.prisma.service.findUnique({
        where: { id },
      }),
    );
  }

  createService(data: CreateServiceDTO) {
    return handleService(() => this.prisma.service.create({ data }));
  }

  async updateService(id: string, data: UpdateServiceDTO) {
    return handleService(() =>
      this.prisma.service.update({
        where: { id },
        data,
      }),
    );
  }

  async deleteService(id: string) {
    return handleService(() => this.prisma.service.delete({ where: { id } }));
  }
}
