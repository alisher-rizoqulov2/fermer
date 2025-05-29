import { PartialType } from '@nestjs/swagger';
import { CreateFarmWalletDto } from './create-farm_wallet.dto';

export class UpdateFarmWalletDto extends PartialType(CreateFarmWalletDto) {}
