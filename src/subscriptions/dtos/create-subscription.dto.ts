import { IsDate, IsIn, IsString, IsUUID } from 'class-validator';
import { $Enums } from 'generated/prisma';

export class CreateSubscriptionDTO {
  @IsIn([
    $Enums.Frequency.monthly,
    $Enums.Frequency.quarterly,
    $Enums.Frequency.yearly,
  ])
  frequency: $Enums.Frequency;

  @IsDate()
  nextBillingDate: Date;

  @IsUUID()
  apartmentId: string;

  @IsUUID()
  serviceId: string;
}
