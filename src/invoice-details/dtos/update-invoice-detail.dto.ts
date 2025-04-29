import { PartialType } from '@nestjs/mapped-types';
import { CreateInvoiceDetailDTO } from './create-invoice-detail.dto';

export class UpdateInvoiceDetailDTO extends PartialType(
  CreateInvoiceDetailDTO,
) {}
