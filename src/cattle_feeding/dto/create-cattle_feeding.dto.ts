import { ApiProperty } from "@nestjs/swagger";
import {
  IsUUID,
  IsString,
  IsNumber,
  IsPositive,
  IsOptional,
  IsDateString,
  Length,
} from "class-validator";

export class CreateCattleFeedingDto {
  @ApiProperty({
    description: "Cattle ID",
    example: 1,
  })
  cattle_id: number;

  @ApiProperty({ description: "Type of feed", example: "Hay" })
  @IsString()
  @Length(2, 50)
  feed_type: string;

  @ApiProperty({ description: "Amount in kg or liters", example: 5.5 })
  @IsNumber()
  @IsPositive()
  amount: number;

  @ApiProperty({ description: "Date of feeding", example: "2025-05-28" })
  @IsDateString()
  date: string;

  @ApiProperty({
    description: "Additional notes",
    example: "Fed in the morning before sunrise",
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(0, 500)
  notes?: string;
}
