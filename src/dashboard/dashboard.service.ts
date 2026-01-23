import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getStats() {
    const [
      totalProducts,
      stockSum,
      totalSalesAmount,
      totalPurchasesAmount,
      totalCreditsAmount,
      lowStockProducts
    ] = await Promise.all([
      this.prisma.product.count(),

      this.prisma.product.aggregate({
        _sum: { quantity: true }
      }),

      this.prisma.sale.aggregate({
        _sum: { total: true }
      }),

      this.prisma.purchase.aggregate({
        _sum: { total: true }
      }),

      this.prisma.credit.aggregate({
        _sum: { remainingAmount: true }
      }),

      this.prisma.product.count({
        where: { quantity: { lte: this.prisma.product.fields.minStock } }
      })
    ]);

    return {
      totalProducts,
      totalStock: stockSum._sum.quantity || 0,
      totalSales: totalSalesAmount._sum.total || 0,
      totalPurchases: totalPurchasesAmount._sum.total || 0,
      totalCredits: totalCreditsAmount._sum.remainingAmount || 0,
      lowStockProducts
    };
  }
}
