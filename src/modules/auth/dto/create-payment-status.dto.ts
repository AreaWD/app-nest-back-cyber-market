import { IsString } from 'class-validator';

export class CreatePaymentStatusDto {
  @IsString()
  StatusName: string;
}
