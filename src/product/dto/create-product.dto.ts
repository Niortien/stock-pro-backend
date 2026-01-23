
import { IsInt, IsNumber, IsString, Min } from "class-validator";

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  category: string;

  @IsInt()
  @Min(0)
  quantity: number;

  @IsNumber()
  unitPrice: number;

  @IsInt()
  @Min(0)
  minStock: number;

  @IsString()
  unit: string;
}
