import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCattleHealthDto } from "./dto/create-cattle_health.dto";
import { UpdateCattleHealthDto } from "./dto/update-cattle_health.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { CattleHealth } from "./entities/cattle_health.entity";
import { Repository } from "typeorm";
import { CattleService } from "../cattle/cattle.service";

@Injectable()
export class CattleHealthService {
  constructor(
    @InjectRepository(CattleHealth)
    private readonly cattleHealthRepo: Repository<CattleHealth>,
    private readonly cattleService: CattleService
  ) {}
  async create(createCattleHealthDto: CreateCattleHealthDto) {
    const { cattle_id } = createCattleHealthDto;
    const cattle = await this.cattleService.findOne(cattle_id);
    if (!cattle) {
      throw new NotFoundException("Bunaqa CattleId yoq");
    }
    const cattleHeath = await this.cattleHealthRepo.create({
      ...createCattleHealthDto,
      cattle: cattle,
    });

    return await this.cattleHealthRepo.save(cattleHeath);
  }

  findAll() {
    return this.cattleHealthRepo.find({
      relations: ["cattle"],
    });
  }

  findOne(id: number) {
    return this.cattleHealthRepo.findOne({
      where: { id },
      relations: ["cattle"],
    });
  }

  async update(id: number, updateCattleHealthDto: UpdateCattleHealthDto) {
    const cattleH = await this.cattleHealthRepo.findOneBy({ id });
    if (!cattleH) {
      throw new NotFoundException(`ID ${id} bo‘yicha malumot yoq topilmadi`);
    }
    const cattle = await this.cattleService.findOne(
      Number(updateCattleHealthDto.cattle_id)
    );
    if (!cattle) {
      throw new NotFoundException("Bunaqa Idli cattle topilmadi");
    }
    const { cattle_id, ...rest } = updateCattleHealthDto;

    await this.cattleHealthRepo.update(id, {
      ...rest,
      cattle: cattle,
    });
    return this.cattleHealthRepo.findOneBy({ id });
  }

  async remove(id: number) {
    const cattlefeeding = await this.cattleHealthRepo.findOneBy({ id });
    if (!cattlefeeding) {
      throw new NotFoundException("Bunaqa Idli cattleFeeding topilmadi");
    }
    await this.cattleHealthRepo.delete(id);

    return { message: `Cattle with id ${id} has been removed` };
  }
}
