import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { CattleModule } from '../cattle/cattle.module';

@Module({
  imports:[TypeOrmModule.forFeature([Sale]),CattleModule],
  controllers: [SalesController],
  providers: [SalesService],
})
export class SalesModule {}
