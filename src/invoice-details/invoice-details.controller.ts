import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { InvoiceDetailsService } from './invoice-details.service';
import { CreateInvoiceDetailDTO } from './dtos/create-invoice-detail.dto';
import { UpdateInvoiceDetailDTO } from './dtos/update-invoice-detail.dto';

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
  createInvoiceDetail(@Body() invoiceDetail: CreateInvoiceDetailDTO) {
    return this.invoiceDetailsService.createInvoiceDetail(invoiceDetail);
  }

  @Put(':id')
  updateInvoiceDetail(
    @Param('id') id: string,
    @Body() data: UpdateInvoiceDetailDTO,
  ) {
    return this.invoiceDetailsService.updateInvoiceDetail(id, data);
  }

  @Delete(':id')
  deleteInvoiceDetail(@Param('id') id: string) {
    return this.invoiceDetailsService.deleteInvoiceDetail(id);
  }
}
