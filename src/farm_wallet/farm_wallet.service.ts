import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFarmWalletDto } from './dto/create-farm_wallet.dto';
import { UpdateFarmWalletDto } from './dto/update-farm_wallet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FarmWallet } from './entities/farm_wallet.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FarmWalletService {
  constructor(@InjectRepository(FarmWallet) private readonly farmWalletRepo:Repository<FarmWallet>){}
  async create(createFarmWalletDto: CreateFarmWalletDto) {
    const farmWallet=await this.farmWalletRepo.create(createFarmWalletDto)
    return this.farmWalletRepo.save(farmWallet)
  }

  findAll() {
    return this.farmWalletRepo.find()
  }

  findOne(id: number) {
    return this.farmWalletRepo.findOneBy({id})
  }

  async update(id: number, updateFarmWalletDto: UpdateFarmWalletDto) {
    await this.farmWalletRepo.update(id,updateFarmWalletDto)
    return this.farmWalletRepo.findOneBy({id})
  }

  async remove(id: number) {
    const remove = await this.farmWalletRepo.findOneBy({ id });
        if (!remove) {
          throw new NotFoundException("Bunaqa Idli cattleFeeding topilmadi");
        }
        await this.farmWalletRepo.delete(id);
    
        return { message: `Cattle with id ${id} has been removed` };
  }
}
