import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { DatabaseModule } from '../database/database.module'; // <-- important

@Module({
  imports: [DatabaseModule],  // <-- ajouté
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
