import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateSaleDto } from "./dto/create-sale.dto";
import { UpdateSaleDto } from "./dto/update-sale.dto";
import { Sale } from "./entities/sale.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CattleService } from "../cattle/cattle.service";

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private readonly SaleRepo: Repository<Sale>,
    private readonly cattleService: CattleService
  ) {}
  async create(createSaleDto: CreateSaleDto) {
    const cattle = await this.cattleService.findOne(
      Number(createSaleDto.cattle_id)
    );
    if (!cattle) {
      throw new NotFoundException("Bunaqa CattleId yoq");
    }
    const cattleSale = this.SaleRepo.create({
      ...createSaleDto,
      cattle,
    });
    return await this.SaleRepo.save(cattleSale);
  }

  findAll() {
    return this.SaleRepo.find({
      relations: ["cattle"],
    });
  }

  findOne(id: number) {
    return this.SaleRepo.findOne({
      where: { id },
      relations: ["cattle"],
    });
  }

  async update(id: number, updateSaleDto: UpdateSaleDto) {
    const cattleRecord = await this.SaleRepo.findOneBy({ id });
    if (!cattleRecord) {
      throw new NotFoundException(`ID ${id} bo‘yicha ma'lumot topilmadi`);
    }

    const { cattle_id, ...rest } = updateSaleDto;
    if (!cattle_id) {
      await this.SaleRepo.update(id, {
        ...rest,
        cattle: cattleRecord.cattle,
      });

      return this.SaleRepo.findOneBy({ id });
    }
    const cattle = await this.cattleService.findOne(Number(cattle_id));
    if (!cattle) {
      throw new BadRequestException("Yangilamoqchi bo'lgan mol mavjud emas");
    }
    await this.SaleRepo.update(id, {
      ...rest,
      cattle: cattle,
    });

    return this.SaleRepo.findOneBy({ id });
  }

  async remove(id: number) {
    const cattleSale = await this.SaleRepo.findOneBy({ id });
    if (!cattleSale) {
      throw new NotFoundException("Bunaqa Idli cattleFeeding topilmadi");
    }
    await this.SaleRepo.delete(id);

    return { message: `Cattle with id ${id} has been removed` };
  }
}
