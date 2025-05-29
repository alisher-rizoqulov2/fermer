import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CattleFeedingService } from "./cattle_feeding.service";
import { CreateCattleFeedingDto } from "./dto/create-cattle_feeding.dto";
import { UpdateCattleFeedingDto } from "./dto/update-cattle_feeding.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("Cattle Feeding")
@Controller("cattle-feeding")
export class CattleFeedingController {
  constructor(private readonly cattleFeedingService: CattleFeedingService) {}

  @Post()
  @ApiOperation({ summary: "Yangi yemlanish yozuvini yaratish" })
  create(@Body() createCattleFeedingDto: CreateCattleFeedingDto) {
    return this.cattleFeedingService.create(createCattleFeedingDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha yemlanish yozuvlarini olish" })
  findAll() {
    return this.cattleFeedingService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID orqali bitta yozuvni olish" })
  findOne(@Param("id") id: string) {
    return this.cattleFeedingService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Yemlanish yozuvini yangilash" })
  update(
    @Param("id") id: string,
    @Body() updateCattleFeedingDto: UpdateCattleFeedingDto
  ) {
    return this.cattleFeedingService.update(+id, updateCattleFeedingDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Yemlanish yozuvini o‘chirish" })
  remove(@Param("id") id: string) {
    return this.cattleFeedingService.remove(+id);
  }
}
