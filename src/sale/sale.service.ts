import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";
import { CreateSaleDto } from "./dto/create-sale.dto";
import { UpdateSaleDto } from "./dto/update-sale.dto";

@Injectable()
export class SaleService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateSaleDto) {
    const sale = await this.prisma.sale.create({
      data: {
        ...dto,
        date: new Date(dto.date),
      },
    });

    // Décrémenter le stock produit
    await this.prisma.product.update({
      where: { id: dto.productId },
      data: {
        quantity: { decrement: dto.quantity },
      },
    });

    return sale;
  }

  async findAll() {
    return this.prisma.sale.findMany({
      include: { product: true },
      orderBy: { date: "desc" },
    });
  }

  async findOne(id: string) {
    const sale = await this.prisma.sale.findUnique({
      where: { id },
      include: { product: true },
    });

    if (!sale) throw new NotFoundException("Sale not found");
    return sale;
  }

  async update(id: string, dto: UpdateSaleDto) {
    return this.prisma.sale.update({
      where: { id },
      data: {
        ...dto,
        date: dto.date ? new Date(dto.date) : undefined,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.sale.delete({ where: { id } });
  }
}
