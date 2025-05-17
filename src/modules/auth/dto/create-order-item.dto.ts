import { IsInt, IsNumber } from 'class-validator';

export class CreateOrderItemDto {
  @IsInt()
  OrderID: number;

  @IsInt()
  ProductID: number;

  @IsInt()
  Quantity: number;

  @IsNumber()
  Price: number;
}
