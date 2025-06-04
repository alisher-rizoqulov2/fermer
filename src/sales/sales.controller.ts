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
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { SalesService } from "./sales.service";
import { CreateSaleDto } from "./dto/create-sale.dto";
import { UpdateSaleDto } from "./dto/update-sale.dto";
import { authGuard } from "../common/guard/auth.guard";
import { UserBuxalterGuard } from "../common/guard/userBuxalter.guard";
import { userSelfGuard } from "../common/guard/userSelf.guard";

@ApiTags("Sales")
@ApiBearerAuth("accessToken")

@Controller("sales")
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  @UseGuards(UserBuxalterGuard)
  @UseGuards(authGuard)
  @ApiOperation({ summary: "Yangi sotuv qo‘shish" })
  create(@Body() createSaleDto: CreateSaleDto) {
    return this.salesService.create(createSaleDto);
  }

  @Get()
  @UseGuards(UserBuxalterGuard)
  @UseGuards(authGuard)
  @ApiOperation({ summary: "Barcha sotuvlarni olish" })
  findAll() {
    return this.salesService.findAll();
  }

  @Get(":id")
  @UseGuards(UserBuxalterGuard)
  @UseGuards(authGuard)
  @ApiOperation({ summary: "ID orqali sotuvni olish" })
  findOne(@Param("id") id: string) {
    return this.salesService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(authGuard, userSelfGuard, UserBuxalterGuard)
  @ApiOperation({ summary: "Sotuvni yangilash" })
  update(@Param("id") id: string, @Body() updateSaleDto: UpdateSaleDto) {
    return this.salesService.update(+id, updateSaleDto);
  }

  @Delete(":id")
  @UseGuards(authGuard, userSelfGuard, UserBuxalterGuard)
  @ApiOperation({ summary: "Sotuvni o‘chirish" })
  remove(@Param("id") id: string) {
    return this.salesService.remove(+id);
  }
}
