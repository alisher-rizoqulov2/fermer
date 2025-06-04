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
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { Admin } from "./entities/admin.entity";
import { authGuard } from "../common/guard/auth.guard";
import { creatorGuard } from "../common/guard/admin_creator.guard";
import { userSelfGuard } from "../common/guard/userSelf.guard";

@ApiTags("Admin") // Swagger bo‘lim nomi
@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @UseGuards(creatorGuard)
  @UseGuards(authGuard)
  @ApiOperation({ summary: "Yangi admin yaratish" })
  @ApiResponse({ status: 201, description: "Admin yaratildi", type: Admin })
  @ApiResponse({ status: 400, description: "Xatolik: Yaroqsiz maʼlumot" })
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get()
  @UseGuards(creatorGuard)
  @UseGuards(authGuard)
  @ApiOperation({ summary: "Barcha adminlarni olish" })
  @ApiResponse({ status: 200, description: "Adminlar ro‘yxati", type: [Admin] })
  findAll() {
    return this.adminService.findAll();
  }

  @Get(":id")
  @UseGuards(userSelfGuard)
  @UseGuards(authGuard)
  @ApiOperation({ summary: "ID orqali bitta adminni olish" })
  @ApiParam({ name: "id", example: 1, description: "Admin ID raqami" })
  @ApiResponse({ status: 200, description: "Topilgan admin", type: Admin })
  @ApiResponse({ status: 404, description: "Admin topilmadi" })
  findOne(@Param("id") id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(userSelfGuard)
  @UseGuards(authGuard)
  @ApiOperation({ summary: "Admin maʼlumotlarini yangilash" })
  @ApiParam({ name: "id", example: 1, description: "Admin ID raqami" })
  @ApiResponse({ status: 200, description: "Admin yangilandi", type: Admin })
  @ApiResponse({ status: 404, description: "Admin topilmadi" })
  update(@Param("id") id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(":id")
  @UseGuards(userSelfGuard)
  @UseGuards(authGuard)
  @ApiOperation({ summary: "Adminni o‘chirish" })
  @ApiParam({ name: "id", example: 1, description: "Admin ID raqami" })
  @ApiResponse({ status: 200, description: "Admin o‘chirildi" })
  @ApiResponse({ status: 404, description: "Admin topilmadi" })
  remove(@Param("id") id: string) {
    return this.adminService.remove(+id);
  }
}
