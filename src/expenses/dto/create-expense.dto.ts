import { ApiProperty } from "@nestjs/swagger";
import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsNumber,
  IsDateString,
} from "class-validator";

export class CreateExpenseDto {
  @ApiProperty({ example: 1, description: "Molning ID raqami" })
  @IsInt()
  @IsNotEmpty()
  cattleId: number;

  @ApiProperty({ example: "Veterinary", description: "Xarajat turi" })
  @IsString()
  @IsNotEmpty()
  expenseType: string;

  @ApiProperty({ example: 150000.5, description: "Xarajat miqdori (so'm)" })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({
    example: "2025-05-29",
    description: "Xarajat sanasi (YYYY-MM-DD)",
  })
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({
    example: "Routine checkup expenses",
    description: "Qo'shimcha izohlar",
  })
  @IsString()
  notes: string;
}
