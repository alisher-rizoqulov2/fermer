import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { UpdateNotificationDto } from "./dto/update-notification.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Notification } from "./entities/notification.entity";
import { Repository } from "typeorm";
import { UsersService } from "../users/users.service";

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepo: Repository<Notification>,
    private readonly userService: UsersService
  ) {}
  async create(createNotificationDto: CreateNotificationDto) {
    const { userId, ...rest } = createNotificationDto;
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new NotFoundException("Bunaqa Idili user topilmadi");
    }
    const notification = await this.notificationRepo.create({ ...rest, user });
    return this.notificationRepo.save(notification);
  }

  findAll() {
    return this.notificationRepo.find({ relations: ["user"] });
  }

  findOne(id: number) {
    return this.notificationRepo.findOneBy({ id });
  }

  async update(id: number, updateNotificationDto: UpdateNotificationDto) {
    const inven = await this.notificationRepo.findOneBy({ id });
    if (!inven) {
      throw new NotFoundException("Bunaqa iDli Invent yoq");
    }
    let { userId, ...rest } = updateNotificationDto;
    if (!userId) {
      await this.notificationRepo.update(id, { ...rest, user: inven.user });
      return this.notificationRepo.findOneBy({ id });
    }
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new NotFoundException("Yangilamoqchi bo'lgan userId li shaxs yoq");
    }
    await this.notificationRepo.update(id, { ...rest, user });
    return this.notificationRepo.findOneBy({ id });
  }

  async remove(id: number) {
    const task = await this.notificationRepo.findOneBy({ id });
    if (!task) {
      throw new NotFoundException(`ID si ${id} bo'lgan workerTask topilmadi`);
    }
    await this.notificationRepo.remove(task);
    return {
      message: `ID si ${id} bo'lgan workerTask muvaffaqiyatli o'chirildi`,
    };
  }
}
