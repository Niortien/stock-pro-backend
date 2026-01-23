import { Module } from '@nestjs/common';
import { CreditService } from './credit.service';
import { CreditController } from './credit.controller';
import { DatabaseModule } from '../database/database.module'; // <-- obligatoire

@Module({
  imports: [DatabaseModule], // <-- ajoute DatabaseModule ici 
  controllers: [CreditController],
  providers: [CreditService],
})
export class CreditModule {}
