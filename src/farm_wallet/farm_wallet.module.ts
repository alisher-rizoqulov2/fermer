import { Module } from '@nestjs/common';
import { FarmWalletService } from './farm_wallet.service';
import { FarmWalletController } from './farm_wallet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FarmWallet } from './entities/farm_wallet.entity';

@Module({
  imports:[TypeOrmModule.forFeature([FarmWallet])],
  controllers: [FarmWalletController],
  providers: [FarmWalletService],
})
export class FarmWalletModule {}
