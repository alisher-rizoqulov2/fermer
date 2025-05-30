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
import { InventoryService } from "./inventory.service";
import { CreateInventoryDto } from "./dto/create-inventory.dto";
import { UpdateInventoryDto } from "./dto/update-inventory.dto";

@ApiTags("Inventory")
@Controller("inventory")
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  @ApiOperation({ summary: "Yangi inventar yaratish" })
  create(@Body() createInventoryDto: CreateInventoryDto) {
    return this.inventoryService.create(createInventoryDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha inventarlarni olish" })
  findAll() {
    return this.inventoryService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID orqali inventarni olish" })
  findOne(@Param("id") id: string) {
    return this.inventoryService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Inventarni yangilash" })
  update(
    @Param("id") id: string,
    @Body() updateInventoryDto: UpdateInventoryDto
  ) {
    return this.inventoryService.update(+id, updateInventoryDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Inventarni o‘chirish" })
  remove(@Param("id") id: string) {
    return this.inventoryService.remove(+id);
  }
}
