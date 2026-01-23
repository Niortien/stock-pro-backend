import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { DatabaseModule } from '../database/database.module'; // <-- obligatoire

@Module({
  imports: [DatabaseModule], // <-- ajoute DatabaseModule ici 
  controllers: [PurchaseController],
  providers: [PurchaseService],
})
export class PurchaseModule {}
