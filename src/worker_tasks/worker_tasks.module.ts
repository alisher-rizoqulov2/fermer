import { Module } from '@nestjs/common';
import { WorkerTasksService } from './worker_tasks.service';
import { WorkerTasksController } from './worker_tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkerTask } from './entities/worker_task.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports:[TypeOrmModule.forFeature([WorkerTask]),UsersModule],
  controllers: [WorkerTasksController],
  providers: [WorkerTasksService],
})
export class WorkerTasksModule {}
