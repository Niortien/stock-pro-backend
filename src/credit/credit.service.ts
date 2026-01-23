import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";
import { CreateCreditDto } from "./dto/create-credit.dto";
import { UpdateCreditDto } from "./dto/update-credit.dto";

@Injectable()
export class CreditService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCreditDto) {
    return this.prisma.credit.create({
      data: {
        ...dto,
        date: new Date(dto.date),
        dueDate: new Date(dto.dueDate),
      },
    });
  }

  async findAll() {
    return this.prisma.credit.findMany({
      orderBy: { date: "desc" },
    });
  }

  async findOne(id: string) {
    const credit = await this.prisma.credit.findUnique({ where: { id } });
    if (!credit) throw new NotFoundException("Credit not found");
    return credit;
  }

  async update(id: string, dto: UpdateCreditDto) {
    return this.prisma.credit.update({
      where: { id },
      data: {
        ...dto,
        date: dto.date ? new Date(dto.date) : undefined,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.credit.delete({ where: { id } });
  }
}
