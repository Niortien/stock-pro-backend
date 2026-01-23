import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { DatabaseModule } from '../database/database.module'; // <-- obligatoire

@Module({
  imports: [DatabaseModule], // <-- ajoute DatabaseModule ici 
  controllers: [InvoiceController],
  providers: [InvoiceService],
})
export class InvoiceModule {}
