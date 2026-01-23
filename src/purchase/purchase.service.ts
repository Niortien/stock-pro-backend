import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";
import { CreatePurchaseDto } from "./dto/create-purchase.dto";
import { UpdatePurchaseDto } from "./dto/update-purchase.dto";

@Injectable()
export class PurchaseService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePurchaseDto) {
    const purchase = await this.prisma.purchase.create({
      data: {
        ...dto,
        date: new Date(dto.date),
      },
    });

    // Incrémenter le stock du produit
    await this.prisma.product.update({
      where: { id: dto.productId },
      data: {
        quantity: { increment: dto.quantity },
      },
    });

    return purchase;
  }

  async findAll() {
    return this.prisma.purchase.findMany({
      include: { product: true },
      orderBy: { date: "desc" },
    });
  }

  async findOne(id: string) {
    const purchase = await this.prisma.purchase.findUnique({
      where: { id },
      include: { product: true },
    });

    if (!purchase) throw new NotFoundException("Purchase not found");
    return purchase;
  }

  async update(id: string, dto: UpdatePurchaseDto) {
    return this.prisma.purchase.update({
      where: { id },
      data: {
        ...dto,
        date: dto.date ? new Date(dto.date) : undefined,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.purchase.delete({ where: { id } });
  }
}
