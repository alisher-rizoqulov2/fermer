import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateCattleProfitLossDto } from "./dto/create-cattle_profit_loss.dto";
import { UpdateCattleProfitLossDto } from "./dto/update-cattle_profit_loss.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { CattleProfitLoss } from "./entities/cattle_profit_loss.entity";
import { CattleService } from "../cattle/cattle.service";
import { Repository } from "typeorm";

@Injectable()
export class CattleProfitLossService {
  constructor(
    @InjectRepository(CattleProfitLoss)
    private readonly cattleProfitLossRepo: Repository<CattleProfitLoss>,
    private readonly cattleService: CattleService
  ) {}
  async create(createCattleProfitLossDto: CreateCattleProfitLossDto) {
    const cattle = await this.cattleProfitLossRepo.findOneBy({
      id: createCattleProfitLossDto.cattle_id,
    });
    if (!cattle) {
      throw new NotFoundException("Bunaqa CattleId yoq");
    }
    const cattleProfitLoss = this.cattleProfitLossRepo.create({
      ...createCattleProfitLossDto,
      cattle,
    });
    return await this.cattleProfitLossRepo.save(cattleProfitLoss);
  }

  findAll() {
    return this.cattleProfitLossRepo.find({
      relations: ["cattle"],
    });
  }

  findOne(id: number) {
    return this.cattleProfitLossRepo.findOne({
      where: { id },
      relations: ["cattle"],
    });
  }

  async update(
    id: number,
    updateCattleProfitLossDto: UpdateCattleProfitLossDto
  ) {
    const cattleRecord = await this.cattleProfitLossRepo.findOneBy({ id });
    if (!cattleRecord) {
      throw new NotFoundException(`ID ${id} bo‘yicha ma'lumot topilmadi`);
    }

    const { cattle_id, ...rest } = updateCattleProfitLossDto;
    const cattle = await this.cattleService.findOne(Number(cattle_id));
    if (!cattle) {
      throw new BadRequestException("Yangilamoqchi bo'lgan mol mavjud emas");
    }
    await this.cattleProfitLossRepo.update(id, {
      ...rest,
      cattle: cattle,
    });

    return this.cattleProfitLossRepo.findOneBy({ id });
  }

  async remove(id: number) {
    const cattlefeeding = await this.cattleProfitLossRepo.findOneBy({ id });
    if (!cattlefeeding) {
      throw new NotFoundException("Bunaqa Idli cattleFeeding topilmadi");
    }
    await this.cattleProfitLossRepo.delete(id);

    return { message: `Cattle with id ${id} has been removed` };
  }
}
