import { PrismaService } from 'src/prisma/prisma.service';

import { Injectable } from '@nestjs/common';

import { CreateApartmentDTO } from './dtos/create-apartment.dto';
import { UpdateApartmentDTO } from './dtos/update-apartment.dto';

@Injectable()
export class ApartmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async createApartment(data: CreateApartmentDTO, residentId: string) {
    try {
      const newApartment = await this.prisma.apartment.create({
        data: {
          ...data,
          residentId,
        },
        select: {
          building: true,
          resident: true,
        },
      });

      return {
        code: 1,
        msg: 'Success',
        data: newApartment,
      };
    } catch (error) {
      return {
        code: 0,
        msg: 'Create apartment failed: ' + JSON.stringify(error),
      };
    }
  }

  async getApartments() {
    try {
      const apartments = await this.prisma.apartment.findMany();

      return {
        code: 1,
        msg: 'Success',
        data: apartments,
      };
    } catch (error) {
      return {
        code: 0,
        msg: 'Get apartments failed: ' + JSON.stringify(error),
      };
    }
  }

  async getApartment(id: string) {
    try {
      const apartment = await this.prisma.apartment.findUnique({
        where: { id },
      });

      return {
        code: 1,
        msg: 'Success',
        data: apartment,
      };
    } catch (error) {
      return {
        code: 0,
        msg: 'Get apartment failed: ' + JSON.stringify(error),
      };
    }
  }

  async updateApartment(id: string, data: UpdateApartmentDTO) {
    try {
      const updatedApartment = await this.prisma.apartment.update({
        where: { id },
        data,
        select: { resident: true },
      });

      return {
        code: 1,
        msg: 'Success',
        data: updatedApartment,
      };
    } catch (error) {
      return {
        code: 0,
        msg: 'Update apartment failed: ' + JSON.stringify(error),
      };
    }
  }

  async deleteApartment(id: string) {
    try {
      await this.prisma.apartment.delete({ where: { id } });

      return {
        code: 0,
        msg: 'Success',
      };
    } catch (error) {
      return {
        code: 0,
        msg: 'Delete apartment failed: ' + JSON.stringify(error),
      };
    }
  }
}
