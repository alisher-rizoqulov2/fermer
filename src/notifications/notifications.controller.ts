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
import { NotificationsService } from "./notifications.service";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { UpdateNotificationDto } from "./dto/update-notification.dto";
import { authGuard } from "../common/guard/auth.guard";
import { userVitGuard } from "../common/guard/userVit.guard";

@Controller("notifications")
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  @UseGuards(userVitGuard)
  @UseGuards(authGuard)
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }

  @Get()
  @UseGuards(userVitGuard)
  @UseGuards(authGuard)
  findAll() {
    return this.notificationsService.findAll();
  }

  @Get(":id")
  @UseGuards(userVitGuard)
  @UseGuards(authGuard)
  findOne(@Param("id") id: string) {
    return this.notificationsService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(userVitGuard)
  @UseGuards(authGuard)
  update(
    @Param("id") id: string,
    @Body() updateNotificationDto: UpdateNotificationDto
  ) {
    return this.notificationsService.update(+id, updateNotificationDto);
  }

  @Delete(":id")
  @UseGuards(userVitGuard)
  @UseGuards(authGuard)
  remove(@Param("id") id: string) {
    return this.notificationsService.remove(+id);
  }
}
