import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateContractDto } from './dtos/create-contract.dto';
import { UpdateContractDTO } from './dtos/update-contract.dto';

@Injectable()
export class ContractsService {
  constructor(private readonly prisma: PrismaService) {}

  async getContracts() {
    try {
      const contracts = await this.prisma.contract.findMany();
      return {
        code: 1,
        msg: 'Success',
        data: contracts,
      };
    } catch (error) {
      return {
        code: 0,
        msg: 'Get contracts failed: ' + JSON.stringify(error),
      };
    }
  }

  async getContract(id: string) {
    try {
      const contract = await this.prisma.contract.findUnique({
        where: {
          id,
        },
      });
      return {
        code: 1,
        msg: 'Success',
        data: contract,
      };
    } catch (error) {
      return {
        code: 0,
        msg: 'Get contract failed: ' + JSON.stringify(error),
      };
    }
  }

  async createContract(data: CreateContractDto, residentId: string) {
    try {
      const newContract = await this.prisma.contract.create({
        data: {
          ...data,
          residentId,
        },
      });
      return {
        code: 1,
        msg: 'Success',
        data: newContract,
      };
    } catch (error) {
      return {
        code: 0,
        msg: 'Create contract failed: ' + JSON.stringify(error),
      };
    }
  }

  async updateContract(id: string, data: UpdateContractDTO) {
    try {
      const updatedContract = await this.prisma.contract.update({
        where: {
          id,
        },
        data,
      });
      return {
        code: 1,
        msg: 'Success',
        data: updatedContract,
      };
    } catch (error) {
      return {
        code: 0,
        msg: 'Update contract failed: ' + JSON.stringify(error),
      };
    }
  }

  async deleteContract(id: string) {
    try {
      await this.prisma.contract.delete({
        where: {
          id,
        },
      });
      return {
        code: 1,
        msg: 'Success',
      };
    } catch (error) {
      return {
        code: 0,
        msg: 'Delete contract failed: ' + JSON.stringify(error),
      };
    }
  }
}
