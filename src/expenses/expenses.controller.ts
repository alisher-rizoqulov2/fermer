import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { ExpensesService } from "./expenses.service";
import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";

@ApiTags("Expenses")
@Controller("expenses")
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  @ApiOperation({ summary: "Yangi xarajat qo‘shish" })
  create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expensesService.create(createExpenseDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha xarajatlarni olish" })
  findAll() {
    return this.expensesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID orqali xarajatni olish" })
  findOne(@Param("id") id: string) {
    return this.expensesService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Xarajatni yangilash" })
  update(@Param("id") id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expensesService.update(+id, updateExpenseDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Xarajatni o‘chirish" })
  remove(@Param("id") id: string) {
    return this.expensesService.remove(+id);
  }
}
