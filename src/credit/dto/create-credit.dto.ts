import { IsEnum, IsNumber, IsString } from "class-validator";
import { CreditStatus } from "@prisma/client";

export class CreateCreditDto {
  @IsString()
  clientName: string;

  @IsNumber()
  amount: number;

  @IsNumber()
  remainingAmount: number;

  @IsString()
  description: string;

  @IsString()
  date: string;

  @IsString()
  dueDate: string;

  @IsEnum(CreditStatus)
  status: CreditStatus;
}
