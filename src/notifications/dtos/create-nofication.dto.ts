import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNotificationDTO {
  @IsString()
  @IsNotEmpty()
  message: string;
}
