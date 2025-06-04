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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
} from "@nestjs/swagger";

@ApiTags("notifications")
@ApiBearerAuth("accessToken")
@Controller("notifications")
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  @UseGuards(userVitGuard, authGuard)
  @ApiOperation({ summary: "Create a new notification" })
  @ApiResponse({
    status: 201,
    description: "Notification created successfully.",
  })
  @ApiResponse({ status: 400, description: "Bad request." })
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }

  @Get()
  @UseGuards(userVitGuard, authGuard)
  @ApiOperation({ summary: "Get all notifications" })
  @ApiResponse({ status: 200, description: "List of notifications." })
  findAll() {
    return this.notificationsService.findAll();
  }

  @Get(":id")
  @UseGuards(userVitGuard, authGuard)
  @ApiOperation({ summary: "Get notification by id" })
  @ApiParam({ name: "id", type: Number, description: "Notification ID" })
  @ApiResponse({ status: 200, description: "Notification found." })
  @ApiResponse({ status: 404, description: "Notification not found." })
  findOne(@Param("id") id: string) {
    return this.notificationsService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(userVitGuard, authGuard)
  @ApiOperation({ summary: "Update notification by id" })
  @ApiParam({ name: "id", type: Number, description: "Notification ID" })
  @ApiResponse({
    status: 200,
    description: "Notification updated successfully.",
  })
  @ApiResponse({ status: 404, description: "Notification not found." })
  update(
    @Param("id") id: string,
    @Body() updateNotificationDto: UpdateNotificationDto
  ) {
    return this.notificationsService.update(+id, updateNotificationDto);
  }

  @Delete(":id")
  @UseGuards(userVitGuard, authGuard)
  @ApiOperation({ summary: "Delete notification by id" })
  @ApiParam({ name: "id", type: Number, description: "Notification ID" })
  @ApiResponse({
    status: 200,
    description: "Notification deleted successfully.",
  })
  @ApiResponse({ status: 404, description: "Notification not found." })
  remove(@Param("id") id: string) {
    return this.notificationsService.remove(+id);
  }
}
