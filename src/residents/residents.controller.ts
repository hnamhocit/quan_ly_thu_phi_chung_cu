import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ResidentsService } from './residents.service';
import { Request } from 'express';
import { UpdateResidentDTO } from './dtos/update-resident.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('residents')
export class ResidentsController {
  constructor(private readonly residentsService: ResidentsService) {}

  @Get()
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles('admin')
  async getAllResidents() {
    return this.residentsService.getResidents();
  }

  @Get('/me/profile')
  async getMyProfile(@Req() req: Request) {
    return this.residentsService.getResident(req.user!['sub']);
  }

  @Get(':id')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles('admin')
  async getResidentById(@Param('id') id: string) {
    return this.residentsService.getResident(id);
  }

  @Put(':id')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles('admin')
  async updateResident(
    @Param('id') id: string,
    @Body() updateResidentDto: UpdateResidentDTO,
  ) {
    return this.residentsService.updateResident(id, updateResidentDto);
  }

  @Delete(':id')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles('admin')
  async deleteResident(@Param('id') id: string) {
    return this.residentsService.deleteResident(id);
  }
}
