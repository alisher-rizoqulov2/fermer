import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";
import { ExpensesService } from "./expenses.service";
import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";
import { authGuard } from "../common/guard/auth.guard";
import { UserBuxalterGuard } from "../common/guard/userBuxalter.guard";

@ApiTags("Expenses")
@ApiBearerAuth("accessToken")

@Controller("expenses")
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  @UseGuards(UserBuxalterGuard)
  @UseGuards(authGuard)
  @ApiOperation({ summary: "Yangi xarajat qo‘shish" })
  create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expensesService.create(createExpenseDto);
  }

  @Get()
  @UseGuards(UserBuxalterGuard)
  @UseGuards(authGuard)
  @ApiOperation({ summary: "Barcha xarajatlarni olish" })
  findAll() {
    return this.expensesService.findAll();
  }

  @Get("total/:id")
  @UseGuards(UserBuxalterGuard)
  @UseGuards(authGuard)
  @ApiOperation({ summary: "Mol uchun jami xarajatni hisoblash" })
  findTotalExpense(@Param("id") id: number) {
    return this.expensesService.findTotalExpense(+id);
  }

  @Get(":id")
  @UseGuards(UserBuxalterGuard)
  @UseGuards(authGuard)
  @ApiOperation({ summary: "ID orqali xarajatni olish" })
  findOne(@Param("id") id: string) {
    return this.expensesService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(UserBuxalterGuard)
  @UseGuards(authGuard)
  @ApiOperation({ summary: "Xarajatni yangilash" })
  update(@Param("id") id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expensesService.update(+id, updateExpenseDto);
  }

  @Delete(":id")
  @UseGuards(UserBuxalterGuard)
  @UseGuards(authGuard)
  @ApiOperation({ summary: "Xarajatni o‘chirish" })
  remove(@Param("id") id: string) {
    return this.expensesService.remove(+id);
  }
}
