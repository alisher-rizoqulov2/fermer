import { Module } from '@nestjs/common';
import { CattleFeedingService } from './cattle_feeding.service';
import { CattleFeedingController } from './cattle_feeding.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CattleFeeding } from './entities/cattle_feeding.entity';
import { CattleModule } from '../cattle/cattle.module';

@Module({
  imports:[TypeOrmModule.forFeature([CattleFeeding]),CattleModule],
  controllers: [CattleFeedingController],
  providers: [CattleFeedingService],
})
export class CattleFeedingModule {}
