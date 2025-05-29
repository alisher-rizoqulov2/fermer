import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FarmWalletService } from './farm_wallet.service';
import { CreateFarmWalletDto } from './dto/create-farm_wallet.dto';
import { UpdateFarmWalletDto } from './dto/update-farm_wallet.dto';

@Controller('farm-wallet')
export class FarmWalletController {
  constructor(private readonly farmWalletService: FarmWalletService) {}

  @Post()
  create(@Body() createFarmWalletDto: CreateFarmWalletDto) {
    return this.farmWalletService.create(createFarmWalletDto);
  }

  @Get()
  findAll() {
    return this.farmWalletService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.farmWalletService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFarmWalletDto: UpdateFarmWalletDto) {
    return this.farmWalletService.update(+id, updateFarmWalletDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.farmWalletService.remove(+id);
  }
}
