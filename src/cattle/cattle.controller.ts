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
import { CattleService } from "./cattle.service";
import { CreateCattleDto } from "./dto/create-cattle.dto";
import { UpdateCattleDto } from "./dto/update-cattle.dto";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { authGuard } from "../common/guard/auth.guard";
import { chorvaOziqlanishGuard } from "../common/guard/chorvaoziqlanish.guard";
import { creatorGuard } from "../common/guard/admin_creator.guard";

@ApiTags("Cattle") // Swagger UI’da guruh nomi
@Controller("cattle")
export class CattleController {
  constructor(private readonly cattleService: CattleService) {}

  @Post()
  @UseGuards(creatorGuard)
  @UseGuards(authGuard)
  @ApiOperation({ summary: "Yangi mol qo‘shish" })
  create(@Body() createCattleDto: CreateCattleDto) {
    return this.cattleService.create(createCattleDto);
  }

  @Get()
  @UseGuards(chorvaOziqlanishGuard)
  @UseGuards(authGuard)
  @ApiOperation({ summary: "Barcha mollarni olish" })
  findAll() {
    return this.cattleService.findAll();
  }

  @Get(":id")
  @UseGuards(chorvaOziqlanishGuard)
  @UseGuards(authGuard)
  @ApiOperation({ summary: "ID orqali bitta molni olish" })
  findOne(@Param("id") id: string) {
    return this.cattleService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(creatorGuard)
  @UseGuards(authGuard)
  @ApiOperation({ summary: "Mol ma’lumotini yangilash" })
  update(@Param("id") id: string, @Body() updateCattleDto: UpdateCattleDto) {
    return this.cattleService.update(+id, updateCattleDto);
  }

  @Delete(":id")
  @UseGuards(creatorGuard)
  @UseGuards(authGuard)
  @ApiOperation({ summary: "Molni o‘chirish" })
  remove(@Param("id") id: string) {
    return this.cattleService.remove(+id);
  }
}
