import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateReminderDto } from "./dto/create-reminder.dto";
import { UpdateReminderDto } from "./dto/update-reminder.dto";
import { Reminder } from "./entities/reminder.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CattleService } from "../cattle/cattle.service";

@Injectable()
export class RemindersService {
  constructor(
    @InjectRepository(Reminder)
    private readonly reminderRepo: Repository<Reminder>,
    private readonly cattleService: CattleService
  ) {}
  async create(createReminderDto: CreateReminderDto) {
    const cattle = await this.cattleService.findOne(
      Number(createReminderDto.cattle_id)
    );
    if (!cattle) {
      throw new NotFoundException("Bunaqa CattleId yoq");
    }
    const cattleReminder = this.reminderRepo.create({
      ...createReminderDto,
      cattle,
    });
    return await this.reminderRepo.save(cattleReminder);
  }

  findAll() {
    return this.reminderRepo.find({
      relations: ["cattle"],
    });
  }

  findOne(id: number) {
    return this.reminderRepo.findOne({
      where: { id },
      relations: ["cattle"],
    });
  }

  async update(id: number, updateReminderDto: UpdateReminderDto) {
    const cattleRemindor = await this.reminderRepo.findOneBy({ id });
    if (!cattleRemindor) {
      throw new NotFoundException(`ID ${id} bo‘yicha ma'lumot topilmadi`);
    }
    const { cattle_id, ...rest } = updateReminderDto;
    const cattle = await this.cattleService.findOne(Number(cattle_id));
    if (!cattle) {
      throw new BadRequestException("Yangilamoqchi bo'lgan mol mavjud emas");
    }
    await this.reminderRepo.update(id, {
      ...rest,
      cattle: cattle,
    });

    return this.reminderRepo.findOneBy({ id });
  }

  async remove(id: number) {
    const cattleReminder = await this.reminderRepo.findOneBy({ id });
    if (!cattleReminder) {
      throw new NotFoundException("Bunaqa Idli cattleFeeding topilmadi");
    }
    await this.reminderRepo.delete(id);

    return { message: `Cattle with id ${id} has been removed` };
  }
}
