import { PartialType } from '@nestjs/swagger';
import { CreateCattleHealthDto } from './create-cattle_health.dto';

export class UpdateCattleHealthDto extends PartialType(CreateCattleHealthDto) {}
