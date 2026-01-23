import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { DatabaseModule } from '../database/database.module'; // <-- obligatoire

@Module({
  imports: [DatabaseModule], // <-- ajoute DatabaseModule ici 
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
