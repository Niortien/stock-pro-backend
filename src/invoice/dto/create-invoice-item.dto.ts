import { IsInt, IsNumber, IsString, Min } from "class-validator";

export class CreateInvoiceItemDto {
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
}
