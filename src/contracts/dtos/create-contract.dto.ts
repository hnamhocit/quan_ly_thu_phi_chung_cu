import { IsNotEmpty, IsString } from 'class-validator';

export class CreateContractDto {
  @IsString()
  @IsNotEmpty()
  documentPath: string;

  @IsString()
  @IsNotEmpty()
  status: string;
}
