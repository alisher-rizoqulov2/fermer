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
import { RemindersService } from "./reminders.service";
import { CreateReminderDto } from "./dto/create-reminder.dto";
import { UpdateReminderDto } from "./dto/update-reminder.dto";
import { authGuard } from "../common/guard/auth.guard";
import { chorvaOziqlanishGuard } from "../common/guard/chorvaoziqlanish.guard";

@ApiTags("Reminders")
@ApiBearerAuth("accessToken")

@Controller("reminders")
export class RemindersController {
  constructor(private readonly remindersService: RemindersService) {}

  @Post()
  @UseGuards(chorvaOziqlanishGuard)
  @UseGuards(authGuard)
  @ApiOperation({ summary: "Yangi eslatma yaratish" })
  create(@Body() createReminderDto: CreateReminderDto) {
    return this.remindersService.create(createReminderDto);
  }

  @Get()
  @UseGuards(chorvaOziqlanishGuard)
  @UseGuards(authGuard)
  @ApiOperation({ summary: "Barcha eslatmalarni olish" })
  findAll() {
    return this.remindersService.findAll();
  }

  @Get(":id")
  @UseGuards(chorvaOziqlanishGuard)
  @UseGuards(authGuard)
  @ApiOperation({ summary: "ID orqali eslatmani olish" })
  findOne(@Param("id") id: string) {
    return this.remindersService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(chorvaOziqlanishGuard)
  @UseGuards(authGuard)
  @ApiOperation({ summary: "Eslatmani yangilash" })
  update(
    @Param("id") id: string,
    @Body() updateReminderDto: UpdateReminderDto
  ) {
    return this.remindersService.update(+id, updateReminderDto);
  }

  @Delete(":id")
  @UseGuards(chorvaOziqlanishGuard)
  @UseGuards(authGuard)
  @ApiOperation({ summary: "Eslatmani o‘chirish" })
  remove(@Param("id") id: string) {
    return this.remindersService.remove(+id);
  }
}
