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
import { FarmWalletService } from "./farm_wallet.service";
import { CreateFarmWalletDto } from "./dto/create-farm_wallet.dto";
import { UpdateFarmWalletDto } from "./dto/update-farm_wallet.dto";
import { authGuard } from "../common/guard/auth.guard";
import { UserBuxalterGuard } from "../common/guard/userBuxalter.guard";

@ApiTags("FarmWallet")
@ApiBearerAuth("accessToken")

@Controller("farm-wallet")
export class FarmWalletController {
  constructor(private readonly farmWalletService: FarmWalletService) {}

  @Post()
  @UseGuards(authGuard, UserBuxalterGuard)
  @ApiOperation({ summary: "Yangi fermer hamyonini yaratish" })
  create(@Body() createFarmWalletDto: CreateFarmWalletDto) {
    return this.farmWalletService.create(createFarmWalletDto);
  }

  @Get()
  @UseGuards(authGuard, UserBuxalterGuard)
  @ApiOperation({ summary: "Barcha fermer hamyonlarini olish" })
  findAll() {
    return this.farmWalletService.findAll();
  }

  @Get(":id")
  @UseGuards(authGuard, UserBuxalterGuard)
  @ApiOperation({ summary: "ID orqali fermer hamyonini olish" })
  findOne(@Param("id") id: string) {
    return this.farmWalletService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(authGuard, UserBuxalterGuard)
  @ApiOperation({ summary: "Fermer hamyonini yangilash" })
  update(
    @Param("id") id: string,
    @Body() updateFarmWalletDto: UpdateFarmWalletDto
  ) {
    return this.farmWalletService.update(+id, updateFarmWalletDto);
  }

  @Delete(":id")
  @UseGuards(authGuard, UserBuxalterGuard)
  @ApiOperation({ summary: "Fermer hamyonini o‘chirish" })
  remove(@Param("id") id: string) {
    return this.farmWalletService.remove(+id);
  }
}
