import { Injectable } from '@nestjs/common';
import { CreateFarmWalletDto } from './dto/create-farm_wallet.dto';
import { UpdateFarmWalletDto } from './dto/update-farm_wallet.dto';

@Injectable()
export class FarmWalletService {
  create(createFarmWalletDto: CreateFarmWalletDto) {
    return 'This action adds a new farmWallet';
  }

  findAll() {
    return `This action returns all farmWallet`;
  }

  findOne(id: number) {
    return `This action returns a #${id} farmWallet`;
  }

  update(id: number, updateFarmWalletDto: UpdateFarmWalletDto) {
    return `This action updates a #${id} farmWallet`;
  }

  remove(id: number) {
    return `This action removes a #${id} farmWallet`;
  }
}
