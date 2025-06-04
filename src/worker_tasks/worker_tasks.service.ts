import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkerTaskDto } from './dto/create-worker_task.dto';
import { UpdateWorkerTaskDto } from './dto/update-worker_task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkerTask } from './entities/worker_task.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';

@Injectable()
export class WorkerTasksService {
  constructor(
    @InjectRepository(WorkerTask)
    private readonly WorkerTaskRepo: Repository<WorkerTask>,
    private readonly userService: UsersService
  ) {}
  async create(createWorkerTaskDto: CreateWorkerTaskDto) {
    const { userId, ...rest } = createWorkerTaskDto;
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new NotFoundException("Bunaqa Idili user topilmadi");
    }
    const notification = await this.WorkerTaskRepo.create({ ...rest, user });
    return this.WorkerTaskRepo.save(notification);
  }

  findAll() {
    return this.WorkerTaskRepo.find({ relations: ["user"] });
  }

  findOne(id: number) {
    return this.WorkerTaskRepo.findOneBy({ id });
  }

  async update(id: number, updateWorkerTaskDto: UpdateWorkerTaskDto) {
    const inven = await this.WorkerTaskRepo.findOneBy({ id });
    if (!inven) {
      throw new NotFoundException("Bunaqa iDli Invent yoq");
    }
    let { userId, ...rest } = updateWorkerTaskDto;
    if (!userId) {
      await this.WorkerTaskRepo.update(id, { ...rest, user: inven.user });
      return this.WorkerTaskRepo.findOneBy({ id });
    }
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new NotFoundException("Yangilamoqchi bo'lgan userId li shaxs yoq");
    }
    await this.WorkerTaskRepo.update(id, { ...rest, user });
    return this.WorkerTaskRepo.findOneBy({ id });
  }

  async remove(id: number) {
    const task = await this.WorkerTaskRepo.findOneBy({ id });
    if (!task) {
      throw new NotFoundException(`ID si ${id} bo'lgan workerTask topilmadi`);
    }
    await this.WorkerTaskRepo.remove(task);
    return {
      message: `ID si ${id} bo'lgan workerTask muvaffaqiyatli o'chirildi`,
    };
  }
}
