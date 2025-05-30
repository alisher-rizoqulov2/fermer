import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateCattleDto } from "./dto/create-cattle.dto";
import { UpdateCattleDto } from "./dto/update-cattle.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Cattle } from "./entities/cattle.entity";
import { Repository } from "typeorm";

@Injectable()
export class CattleService {
  constructor(
    @InjectRepository(Cattle) private readonly cattleRepo: Repository<Cattle>
  ) {}
  async create(createCattleDto: CreateCattleDto) {
    const { tag_number } = createCattleDto;

    const existing = await this.cattleRepo.findOne({ where: { tag_number } });
    if (existing) {
      throw new BadRequestException(`Tag number ${tag_number} already exists.`);
    }

    const new_cattle = this.cattleRepo.create(createCattleDto);
    return await this.cattleRepo.save(new_cattle);
  }

  findAll() {
    return this.cattleRepo.find({
      relations: [
        "feedings",
        "healthRecords",
        "sales",
        "expenses",
        "reminders",
        "profitLossRecords",
      ],
    });
  }

  findOne(id: number) {
    return this.cattleRepo.findOne({
      where: { id },
      relations: [
        "feedings",
        "healthRecords",
        "sales",
        "expenses",
        "reminders",
        "profitLossRecords",
      ],
    });
  }

  async update(id: number, updateCattleDto: UpdateCattleDto) {
    const cattle = await this.cattleRepo.findOneBy({ id });
    if (!cattle) {
      throw new NotFoundException(`ID ${id} bo‘yicha malumot yoq topilmadi`);
    }
    await this.cattleRepo.update(id, updateCattleDto);
    return this.cattleRepo.findOneBy({ id });
  }

  async remove(id: number) {
    const cattle = await this.cattleRepo.findOneBy({ id });
    if (!cattle) {
      throw new Error(`Cattle with id ${id} not found`);
    }
    await this.cattleRepo.remove(cattle);
    return { message: `Cattle with id ${id} has been removed` };
  }
}
