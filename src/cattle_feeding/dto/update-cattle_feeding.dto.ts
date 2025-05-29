import { PartialType } from '@nestjs/swagger';
import { CreateCattleFeedingDto } from './create-cattle_feeding.dto';

export class UpdateCattleFeedingDto extends PartialType(CreateCattleFeedingDto) {}
