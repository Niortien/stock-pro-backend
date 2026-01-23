import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { HashageModule } from './hashage/hashage.module';
import { DatabaseModule } from './database/database.module';
import { ProductModule } from './product/product.module';
import { SaleModule } from './sale/sale.module';
import { CreditModule } from './credit/credit.module';
import { PurchaseModule } from './purchase/purchase.module';
import { InvoiceModule } from './invoice/invoice.module';
import { DashboardModule } from './dashboard/dashboard.module';


@Module({
  imports: [ AuthModule, HashageModule, DatabaseModule, ProductModule, SaleModule, CreditModule, PurchaseModule, InvoiceModule, DashboardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
