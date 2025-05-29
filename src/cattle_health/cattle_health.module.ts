import { Module } from '@nestjs/common';
import { CattleHealthService } from './cattle_health.service';
import { CattleHealthController } from './cattle_health.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CattleHealth } from './entities/cattle_health.entity';
import { CattleModule } from '../cattle/cattle.module';

@Module({
  imports:[TypeOrmModule.forFeature([CattleHealth]),CattleModule],
  controllers: [CattleHealthController],
  providers: [CattleHealthService],
})
export class CattleHealthModule {}
