import { PartialType } from '@nestjs/swagger';
import { CreateWorkerTaskDto } from './create-worker_task.dto';

export class UpdateWorkerTaskDto extends PartialType(CreateWorkerTaskDto) {}
