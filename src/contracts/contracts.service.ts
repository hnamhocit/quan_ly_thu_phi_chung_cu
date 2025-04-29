import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateContractDto } from './dtos/create-contract.dto';
import { UpdateContractDTO } from './dtos/update-contract.dto';
import { handleService } from 'src/common/utils/handleService';

@Injectable()
export class ContractsService {
  constructor(private readonly prisma: PrismaService) {}

  getContracts() {
    return handleService(() => this.prisma.contract.findMany());
  }

  getContract(id: string) {
    return handleService(() =>
      this.prisma.contract.findUnique({
        where: {
          id,
        },
      }),
    );
  }

  createContract(data: CreateContractDto, residentId: string) {
    return handleService(() =>
      this.prisma.contract.create({
        data: {
          ...data,
          residentId,
        },
      }),
    );
  }

  updateContract(id: string, data: UpdateContractDTO) {
    return handleService(() =>
      this.prisma.contract.update({
        where: {
          id,
        },
        data,
      }),
    );
  }

  deleteContract(id: string) {
    return handleService(() =>
      this.prisma.contract.delete({
        where: {
          id,
        },
      }),
    );
  }
}
