import { IsInt, IsNumber, IsString, IsDate } from 'class-validator';

export class CreateOrderDto {
  @IsInt()
  UserID: number;

  @IsDate()
  OrderDate: Date;

  @IsInt()
  StatusID: number;

  @IsNumber()
  TotalAmount: number;

  @IsString()
  ShippingAddress: string;
}
