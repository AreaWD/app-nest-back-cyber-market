import { IsString, IsNumber, IsInt } from 'class-validator';

export class CreateProductDto {
  @IsString()
  Name: string;

  @IsString()
  Description: string;

  @IsNumber()
  Price: number;

  @IsInt()
  Stock: number;

  @IsInt()
  CategoryID: number;
}
