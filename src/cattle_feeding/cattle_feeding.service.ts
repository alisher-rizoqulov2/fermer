import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateCattleFeedingDto } from "./dto/create-cattle_feeding.dto";
import { UpdateCattleFeedingDto } from "./dto/update-cattle_feeding.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { CattleFeeding } from "./entities/cattle_feeding.entity";
import { Repository } from "typeorm";
import { CattleService } from "../cattle/cattle.service";

@Injectable()
export class CattleFeedingService {
  constructor(
    @InjectRepository(CattleFeeding)
    private readonly cattleFeedingRepo: Repository<CattleFeeding>,
    private readonly cattleService: CattleService
  ) {}
  async create(createCattleFeedingDto: CreateCattleFeedingDto) {
    const { cattle_id } = createCattleFeedingDto;
    const cattle = await this.cattleService.findOne(cattle_id);
    if (!cattle) {
      throw new NotFoundException("Bunaqa CattleId yoq");
    }
    const cattlefeeding = this.cattleFeedingRepo.create({
      ...createCattleFeedingDto,
      cattle,
    });
    return await this.cattleFeedingRepo.save(cattlefeeding);
  }

  findAll() {
    return this.cattleFeedingRepo.find({
      relations: ["cattle"],
    });
  }

  findOne(id: number) {
    return this.cattleFeedingRepo.findOneBy({ id });
  }

  async update(id: number, updateCattleFeedingDto: UpdateCattleFeedingDto) {
    const cattlef = await this.cattleFeedingRepo.findOneBy({ id });

    if (!cattlef) {
      throw new NotFoundException(`ID ${id} bo‘yicha ma'lumot topilmadi`);
    }
    const { cattle_id, ...rest } = updateCattleFeedingDto;
    if (!cattle_id) {
      await this.cattleFeedingRepo.update(id, {
        ...rest,
        cattle: cattlef.cattle,
      });

      return this.cattleFeedingRepo.findOneBy({ id });
    }

    const cattle = await this.cattleService.findOne(cattle_id!);

    if (!cattle) {
      throw new BadRequestException(
        "Yangilamoqchi bo'lgan molingiz mavjud emas"
      );
    }
    await this.cattleFeedingRepo.update(id, {
      ...rest,
      cattle: cattle,
    });

    return this.cattleFeedingRepo.findOneBy({ id });
  }

  async remove(id: number) {
    const cattlefeeding = await this.cattleFeedingRepo.findOneBy({ id });
    if (!cattlefeeding) {
      throw new NotFoundException("Bunaqa Idli cattleFeeding topilmadi");
    }
    await this.cattleFeedingRepo.delete(id);

    return { message: `Cattle with id ${id} has been removed` };
  }
}
