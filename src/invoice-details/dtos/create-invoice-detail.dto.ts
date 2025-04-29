import { IsNumber, IsPositive, IsUUID } from 'class-validator';

export class CreateInvoiceDetailDTO {
  @IsNumber()
  @IsPositive()
  quantity: number;

  @IsUUID()
  serviceId: string;

  @IsUUID()
  invoiceId: string;

  @IsUUID()
  apartmentId: string;
}
