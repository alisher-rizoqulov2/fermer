import { ApiProperty } from "@nestjs/swagger";
import {
  IsInt,
  IsString,
  IsDateString,
  IsBoolean,
  IsOptional,
  IsNotEmpty,
} from "class-validator";

export class CreateReminderDto {
  @ApiProperty({ example: 1, description: "Molning ID raqami" })
  @IsInt()
  @IsNotEmpty()
  cattleId: number;

  @ApiProperty({ example: "Emlash vaqti keldi", description: "Eslatma matni" })
  @IsString()
  @IsNotEmpty()
  reminderText: string;

  @ApiProperty({
    example: "2025-06-01",
    description: "Muddat sanasi (YYYY-MM-DD)",
  })
  @IsDateString()
  @IsNotEmpty()
  dueDate: string;

  @ApiProperty({
    example: false,
    description: "Bajarilganligi holati",
    required: false,
  })
  @IsBoolean()
  isDone?: boolean;
}
