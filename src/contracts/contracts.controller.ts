import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { CreateContractDto } from './dtos/create-contract.dto';
import { Request } from 'express';
import { UpdateContractDTO } from './dtos/update-contract.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Get()
  async getContracts() {
    return await this.contractsService.getContracts();
  }

  @Get(':id')
  async getContract(id: string) {
    return await this.contractsService.getContract(id);
  }

  @Post()
  @Roles('admin')
  @UseGuards(AccessTokenGuard, RolesGuard)
  async createContract(data: CreateContractDto, @Req() req: Request) {
    return await this.contractsService.createContract(data, req.user!['sub']);
  }

  @Put(':id')
  @Roles('admin')
  @UseGuards(AccessTokenGuard, RolesGuard)
  async updateContract(@Param('id') id: string, data: UpdateContractDTO) {
    return await this.contractsService.updateContract(id, data);
  }

  @Delete(':id')
  @Roles('admin')
  @UseGuards(AccessTokenGuard, RolesGuard)
  async deleteContract(@Param('id') id: string) {
    return await this.contractsService.deleteContract(id);
  }
}
