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
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { authGuard } from "../common/guard/auth.guard";
import { adminGuard } from "../common/guard/admin.guard";
import { userSelfGuard } from "../common/guard/userSelf.guard";

@ApiTags("Users") // Swagger bo‘lim nomi
@ApiBearerAuth("accessToken")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards()
  @ApiOperation({ summary: "Yangi foydalanuvchi yaratish" })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(authGuard,adminGuard)
  @ApiOperation({ summary: "Barcha foydalanuvchilar ro‘yxatini olish" })
  findAll() {   
    return this.usersService.findAll();
  }

  @Get(":id")
  @UseGuards(authGuard,userSelfGuard)
  @ApiOperation({ summary: "Bitta foydalanuvchini ID orqali olish" })
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(authGuard,userSelfGuard)
  @ApiOperation({ summary: "Foydalanuvchini yangilash" })
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(":id")
  @UseGuards(authGuard,userSelfGuard)
  @ApiOperation({ summary: "Foydalanuvchini o‘chirish" })
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }
}
