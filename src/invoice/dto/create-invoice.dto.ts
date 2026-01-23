import { IsArray, IsEnum, IsNumber, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { InvoiceStatus } from "@prisma/client";
import { CreateInvoiceItemDto } from "./create-invoice-item.dto";

export class CreateInvoiceDto {
  @IsString()
  invoiceNumber: string;

  @IsString()
  clientName: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateInvoiceItemDto)
  items: CreateInvoiceItemDto[];

  @IsNumber()
  subtotal: number;

  @IsNumber()
  tax: number;

  @IsNumber()
  total: number;

  @IsEnum(InvoiceStatus)
  status: InvoiceStatus;

  @IsString()
  date: string;
}
