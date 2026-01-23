import { Module } from '@nestjs/common';
import { SaleService } from './sale.service';
import { SaleController } from './sale.controller';
import { DatabaseModule } from '../database/database.module'; // <-- obligatoire

@Module({
  imports: [DatabaseModule], // <-- ajoute DatabaseModule ici
  controllers: [SaleController],
  providers: [SaleService],
})
export class SaleModule {}
