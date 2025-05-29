import { Module } from '@nestjs/common';
import { FarmWalletService } from './farm_wallet.service';
import { FarmWalletController } from './farm_wallet.controller';

@Module({
  controllers: [FarmWalletController],
  providers: [FarmWalletService],
})
export class FarmWalletModule {}
