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
import { RemindersService } from "./reminders.service";
import { CreateReminderDto } from "./dto/create-reminder.dto";
import { UpdateReminderDto } from "./dto/update-reminder.dto";

@ApiTags("Reminders")
@Controller("reminders")
export class RemindersController {
  constructor(private readonly remindersService: RemindersService) {}

  @Post()
  @ApiOperation({ summary: "Yangi eslatma yaratish" })
  create(@Body() createReminderDto: CreateReminderDto) {
    return this.remindersService.create(createReminderDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha eslatmalarni olish" })
  findAll() {
    return this.remindersService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID orqali eslatmani olish" })
  findOne(@Param("id") id: string) {
    return this.remindersService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Eslatmani yangilash" })
  update(
    @Param("id") id: string,
    @Body() updateReminderDto: UpdateReminderDto
  ) {
    return this.remindersService.update(+id, updateReminderDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Eslatmani o‘chirish" })
  remove(@Param("id") id: string) {
    return this.remindersService.remove(+id);
  }
}
