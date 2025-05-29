import { Module } from '@nestjs/common';
import { CattleProfitLossService } from './cattle_profit_loss.service';
import { CattleProfitLossController } from './cattle_profit_loss.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CattleProfitLoss } from './entities/cattle_profit_loss.entity';
import { CattleModule } from '../cattle/cattle.module';

@Module({
  imports:[TypeOrmModule.forFeature([CattleProfitLoss]),CattleModule],
  controllers: [CattleProfitLossController],
  providers: [CattleProfitLossService],
})
export class CattleProfitLossModule {}
