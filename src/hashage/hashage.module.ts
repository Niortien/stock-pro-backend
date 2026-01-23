import { Module } from '@nestjs/common';
import { hashageService } from './hashage.service';


@Module({
  controllers: [],
  providers: [hashageService],
})
export class HashageModule {}
