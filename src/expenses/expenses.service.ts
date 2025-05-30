import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Expense } from "./entities/expense.entity";
import { Repository } from "typeorm";
import { CattleService } from "../cattle/cattle.service";

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense)
    private readonly expensesRepo: Repository<Expense>,
    private readonly cattleService: CattleService
  ) {}
  async create(createExpenseDto: CreateExpenseDto) {
    const cattle = await this.cattleService.findOne(
      Number(createExpenseDto.cattle_id));
    if (!cattle) {
      throw new NotFoundException("Bunaqa CattleId yoq");
    }
    const cattleExpense = this.expensesRepo.create({
      ...createExpenseDto,
      cattle,
    });
    return await this.expensesRepo.save(cattleExpense);
  }

  findAll() {
    return this.expensesRepo.find({
      relations: ["cattle"],
    });
  }

  findOne(id: number) {
    return this.expensesRepo.findOne({
      where: { id },
      relations: ["cattle"],
    });
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto) {
    const cattleRecord = await this.expensesRepo.findOneBy({ id });
    if (!cattleRecord) {
      throw new NotFoundException(`ID ${id} bo‘yicha ma'lumot topilmadi`);
    }

    const { cattle_id, ...rest } = updateExpenseDto;
    const cattle = await this.cattleService.findOne(Number(cattle_id));
    if (!cattle) {
      throw new BadRequestException("Yangilamoqchi bo'lgan mol mavjud emas");
    }
    await this.expensesRepo.update(id, {
      ...rest,
      cattle: cattle,
    });

    return this.expensesRepo.findOneBy({ id });
  }

  async remove(id: number) {
    const cattlefeeding = await this.expensesRepo.findOneBy({ id });
    if (!cattlefeeding) {
      throw new NotFoundException("Bunaqa Idli cattleFeeding topilmadi");
    }
    await this.expensesRepo.delete(id);

    return { message: `Cattle with id ${id} has been removed` };
  }
}
