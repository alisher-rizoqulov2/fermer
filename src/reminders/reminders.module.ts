import { Module } from '@nestjs/common';
import { RemindersService } from './reminders.service';
import { RemindersController } from './reminders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reminder } from './entities/reminder.entity';
import { CattleModule } from '../cattle/cattle.module';

@Module({
  imports:[TypeOrmModule.forFeature([Reminder]),CattleModule],
  controllers: [RemindersController],
  providers: [RemindersService],
})
export class RemindersModule {}
