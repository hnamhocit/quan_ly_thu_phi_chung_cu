import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { InvoiceDetailsService } from './invoice-details.service';
import { CreateInvoiceDetailDTO } from './dtos/create-invoice-detail.dto';
import { UpdateInvoiceDetailDTO } from './dtos/update-invoice-detail.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('invoice-details')
export class InvoiceDetailsController {
  constructor(private readonly invoiceDetailsService: InvoiceDetailsService) {}

  @Get()
  getInvoiceDetails() {
    return this.invoiceDetailsService.getInvoiceDetails();
  }

  @Get(':id')
  getInvoiceDetail(@Param('id') id: string) {
    return this.invoiceDetailsService.getInvoiceDetail(id);
  }

  @Post()
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles('admin')
  createInvoiceDetail(@Body() invoiceDetail: CreateInvoiceDetailDTO) {
    return this.invoiceDetailsService.createInvoiceDetail(invoiceDetail);
  }

  @Put(':id')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles('admin')
  updateInvoiceDetail(
    @Param('id') id: string,
    @Body() data: UpdateInvoiceDetailDTO,
  ) {
    return this.invoiceDetailsService.updateInvoiceDetail(id, data);
  }

  @Delete(':id')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles('admin')
  deleteInvoiceDetail(@Param('id') id: string) {
    return this.invoiceDetailsService.deleteInvoiceDetail(id);
  }
}
