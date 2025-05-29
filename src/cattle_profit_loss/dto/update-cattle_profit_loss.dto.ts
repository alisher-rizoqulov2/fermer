import { PartialType } from '@nestjs/swagger';
import { CreateCattleProfitLossDto } from './create-cattle_profit_loss.dto';

export class UpdateCattleProfitLossDto extends PartialType(CreateCattleProfitLossDto) {}
