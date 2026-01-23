import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";
import { CreateInvoiceDto } from "./dto/create-invoice.dto";
import { UpdateInvoiceDto } from "./dto/update-invoice.dto";

@Injectable()
export class InvoiceService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateInvoiceDto) {
    return this.prisma.$transaction(async (tx) => {
      const invoice = await tx.invoice.create({
        data: {
          invoiceNumber: dto.invoiceNumber,
          clientName: dto.clientName,
          subtotal: dto.subtotal,
          tax: dto.tax,
          total: dto.total,
          status: dto.status,
          date: new Date(dto.date),
          items: {
            create: dto.items,
          },
        },
        include: { items: true },
      });

      for (const item of dto.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            quantity: { decrement: item.quantity },
          },
        });
      }

      return invoice;
    });
  }

  async findAll() {
    return this.prisma.invoice.findMany({
      include: { items: true },
      orderBy: { date: "desc" },
    });
  }

  async findOne(id: string) {
    const invoice = await this.prisma.invoice.findUnique({
      where: { id },
      include: { items: true },
    });

    if (!invoice) throw new NotFoundException("Invoice not found");
    return invoice;
  }

  async update(id: string, dto: UpdateInvoiceDto) {
    return this.prisma.invoice.update({
      where: { id },
      data: {
        ...dto,
        date: dto.date ? new Date(dto.date) : undefined,
        items: {
          deleteMany: {},
          create: dto.items,
        },
      },
    });
  }

  async remove(id: string) {
    return this.prisma.invoice.delete({ where: { id } });
  }
}
