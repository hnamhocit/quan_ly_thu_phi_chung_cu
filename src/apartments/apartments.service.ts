import { PrismaService } from 'src/prisma/prisma.service';

import { Injectable } from '@nestjs/common';

import { CreateApartmentDTO } from './dtos/create-apartment.dto';
import { UpdateApartmentDTO } from './dtos/update-apartment.dto';
import { handleService } from 'src/common/utils/handleService';

@Injectable()
export class ApartmentsService {
  constructor(private readonly prisma: PrismaService) {}

  createApartment(data: CreateApartmentDTO, residentId: string) {
    return handleService(() =>
      this.prisma.apartment.create({
        data: {
          ...data,
          residentId,
        },
        select: {
          building: true,
          resident: true,
        },
      }),
    );
  }

  getApartments() {
    return handleService(() => this.prisma.apartment.findMany());
  }

  async getApartment(id: string) {
    return handleService(() =>
      this.prisma.apartment.findUnique({
        where: { id },
      }),
    );
  }

  async updateApartment(id: string, data: UpdateApartmentDTO) {
    return handleService(() =>
      this.prisma.apartment.update({
        where: { id },
        data,
        select: { resident: true },
      }),
    );
  }

  async deleteApartment(id: string) {
    return handleService(() => this.prisma.apartment.delete({ where: { id } }));
  }
}
