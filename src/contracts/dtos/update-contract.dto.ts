import { PartialType } from '@nestjs/mapped-types';
import { CreateContractDto } from './create-contract.dto';

export class UpdateContractDTO extends PartialType(CreateContractDto) {}
