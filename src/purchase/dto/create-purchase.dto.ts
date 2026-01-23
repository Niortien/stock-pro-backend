import { IsBoolean, IsInt, IsNumber, IsString, Min } from "class-validator";

export class CreatePurchaseDto {
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

  @IsString()
  supplierName: string;

  @IsBoolean()
  isPaid: boolean;

  @IsString()
  date: string;
}
