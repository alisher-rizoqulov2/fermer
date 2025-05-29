import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CattleService } from "./cattle.service";
import { CreateCattleDto } from "./dto/create-cattle.dto";
import { UpdateCattleDto } from "./dto/update-cattle.dto";
import { ApiTags, ApiOperation } from "@nestjs/swagger";

@ApiTags("Cattle") // Swagger UI’da guruh nomi
@Controller("cattle")
export class CattleController {
  constructor(private readonly cattleService: CattleService) {}

  @Post()
  @ApiOperation({ summary: "Yangi mol qo‘shish" })
  create(@Body() createCattleDto: CreateCattleDto) {
    return this.cattleService.create(createCattleDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha mollarni olish" })
  findAll() {
    return this.cattleService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID orqali bitta molni olish" })
  findOne(@Param("id") id: string) {
    return this.cattleService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Mol ma’lumotini yangilash" })
  update(@Param("id") id: string, @Body() updateCattleDto: UpdateCattleDto) {
    return this.cattleService.update(+id, updateCattleDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Molni o‘chirish" })
  remove(@Param("id") id: string) {
    return this.cattleService.remove(+id);
  }
}
