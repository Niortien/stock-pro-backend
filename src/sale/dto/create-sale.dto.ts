import { IsBoolean, IsInt, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CreateSaleDto {
  @IsString()
  productId: string;

  @IsString()
  productName: string;

  @IsInt()
  @Min(1)
  quantity: number;

  @IsNumber()
  unitPrice: number;

  @IsNumber()
  total: number;

  @IsOptional()
  @IsString()
  clientName?: string;

  @IsBoolean()
  isPaid: boolean;

  @IsString()
  date: string;
}
