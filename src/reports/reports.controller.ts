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
import { ReportsService } from "./reports.service";
import { CreateReportDto } from "./dto/create-report.dto";
import { UpdateReportDto } from "./dto/update-report.dto";
import { authGuard } from "../common/guard/auth.guard";
import { UserBuxalterGuard } from "../common/guard/userBuxalter.guard";
import { userSelfGuard } from "../common/guard/userSelf.guard";

@ApiTags("Reports")
@ApiBearerAuth("accessToken")

@Controller("reports")
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  @UseGuards(UserBuxalterGuard)
  @UseGuards(authGuard)
  @ApiOperation({ summary: "Yangi hisobot yaratish" })
  create(@Body() createReportDto: CreateReportDto) {
    return this.reportsService.create(createReportDto);
  }

  @Get()
  @UseGuards(UserBuxalterGuard)
  @UseGuards(authGuard)
  @ApiOperation({ summary: "Barcha hisobotlarni olish" })
  findAll() {
    return this.reportsService.findAll();
  }

  @Get(":id")
  @UseGuards(UserBuxalterGuard)
  @UseGuards(authGuard)
  @ApiOperation({ summary: "ID orqali hisobotni olish" })
  findOne(@Param("id") id: string) {
    return this.reportsService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(UserBuxalterGuard, userSelfGuard, UserBuxalterGuard)
  @UseGuards(authGuard)
  @ApiOperation({ summary: "Hisobotni yangilash" })
  update(@Param("id") id: string, @Body() updateReportDto: UpdateReportDto) {
    return this.reportsService.update(+id, updateReportDto);
  }

  @Delete(":id")
  @UseGuards()
  @UseGuards(authGuard, userSelfGuard, UserBuxalterGuard)
  @ApiOperation({ summary: "Hisobotni o‘chirish" })
  remove(@Param("id") id: string) {
    return this.reportsService.remove(+id);
  }
}
