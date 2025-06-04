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
import { CattleFeedingService } from "./cattle_feeding.service";
import { CreateCattleFeedingDto } from "./dto/create-cattle_feeding.dto";
import { UpdateCattleFeedingDto } from "./dto/update-cattle_feeding.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { authGuard } from "../common/guard/auth.guard";
import { chorvaOziqlanishGuard } from "../common/guard/chorvaoziqlanish.guard";

@ApiTags("Cattle Feeding")
@Controller("cattle-feeding")
export class CattleFeedingController {
  constructor(private readonly cattleFeedingService: CattleFeedingService) {}

  @Post()
  @UseGuards(chorvaOziqlanishGuard)
  @UseGuards(authGuard)
  @ApiOperation({ summary: "Yangi yemlanish yozuvini yaratish" })
  create(@Body() createCattleFeedingDto: CreateCattleFeedingDto) {
    return this.cattleFeedingService.create(createCattleFeedingDto);
  }

  @Get()
  @UseGuards(chorvaOziqlanishGuard)
  @UseGuards(authGuard)
  @ApiOperation({ summary: "Barcha yemlanish yozuvlarini olish" })
  findAll() {
    return this.cattleFeedingService.findAll();
  }

  @Get(":id")
  @UseGuards(chorvaOziqlanishGuard)
  @UseGuards(authGuard)
  @ApiOperation({ summary: "ID orqali bitta yozuvni olish" })
  findOne(@Param("id") id: string) {
    return this.cattleFeedingService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(chorvaOziqlanishGuard)
  @UseGuards(authGuard)
  @ApiOperation({ summary: "Yemlanish yozuvini yangilash" })
  update(
    @Param("id") id: string,
    @Body() updateCattleFeedingDto: UpdateCattleFeedingDto
  ) {
    return this.cattleFeedingService.update(+id, updateCattleFeedingDto);
  }

  @Delete(":id")
  @UseGuards(chorvaOziqlanishGuard)
  @UseGuards(authGuard)
  @ApiOperation({ summary: "Yemlanish yozuvini o‘chirish" })
  remove(@Param("id") id: string) {
    return this.cattleFeedingService.remove(+id);
  }
}
