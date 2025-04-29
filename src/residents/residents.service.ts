import { Injectable } from '@nestjs/common';
import { handleService } from 'src/common/utils/handleService';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateResidentDTO } from './dtos/update-resident.dto';

@Injectable()
export class ResidentsService {
  constructor(private readonly prisma: PrismaService) {}

  async getResidents() {
    return handleService(() => this.prisma.resident.findMany());
  }

  async getResident(id: string) {
    return handleService(() =>
      this.prisma.resident.findUnique({ where: { id } }),
    );
  }

  async updateResident(id: string, data: UpdateResidentDTO) {
    return handleService(() =>
      this.prisma.resident.update({ where: { id }, data }),
    );
  }

  async deleteResident(id: string) {
    return handleService(() => this.prisma.resident.delete({ where: { id } }));
  }
}
