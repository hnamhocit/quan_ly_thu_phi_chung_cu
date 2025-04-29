import { PrismaService } from 'src/prisma/prisma.service';

import { Injectable } from '@nestjs/common';

import { CreateBuildingDTO } from './dtos/create-building.dto';
import { UpdateBuildingDTO } from './dtos/update-building.dto';
import { handleService } from 'src/common/utils/handleService';

@Injectable()
export class BuildingsService {
  constructor(private readonly prisma: PrismaService) {}

  getBuildings() {
    return handleService(() => this.prisma.building.findMany());
  }

  getBuilding(id: string) {
    return handleService(() =>
      this.prisma.building.findUnique({ where: { id } }),
    );
  }

  createBuilding(data: CreateBuildingDTO) {
    return handleService(() => this.prisma.building.create({ data }));
  }

  deleteBuilding(id: string) {
    return handleService(() => this.prisma.building.delete({ where: { id } }));
  }

  updateBuilding(id: string, data: UpdateBuildingDTO) {
    return handleService(() =>
      this.prisma.building.update({
        where: { id },
        data,
      }),
    );
  }
}
