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
import { InventoryService } from "./inventory.service";
import { CreateInventoryDto } from "./dto/create-inventory.dto";
import { UpdateInventoryDto } from "./dto/update-inventory.dto";
import { authGuard } from "../common/guard/auth.guard";

@ApiTags("Inventory")
@ApiBearerAuth("accessToken")
@Controller("inventory")
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  @UseGuards(authGuard)
  @ApiOperation({ summary: "Yangi inventar yaratish" })
  create(@Body() createInventoryDto: CreateInventoryDto) {
    return this.inventoryService.create(createInventoryDto);
  }

  @Get()
  @UseGuards(authGuard)
  @ApiOperation({ summary: "Barcha inventarlarni olish" })
  findAll() {
    return this.inventoryService.findAll();
  }

  @Get(":id")
  @UseGuards(authGuard)
  @ApiOperation({ summary: "ID orqali inventarni olish" })
  findOne(@Param("id") id: string) {
    return this.inventoryService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(authGuard)
  @ApiOperation({ summary: "Inventarni yangilash" })
  update(
    @Param("id") id: string,
    @Body() updateInventoryDto: UpdateInventoryDto
  ) {
    return this.inventoryService.update(+id, updateInventoryDto);
  }

  @Delete(":id")
  @UseGuards(authGuard)
  @ApiOperation({ summary: "Inventarni o‘chirish" })
  remove(@Param("id") id: string) {
    return this.inventoryService.remove(+id);
  }
}
