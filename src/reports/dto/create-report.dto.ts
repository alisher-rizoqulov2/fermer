import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsDateString, IsNumber, IsNotEmpty } from "class-validator";

export class CreateReportDto {
  @ApiProperty({ example: "Monthly", description: "Hisobot turi" })
  @IsString()
  @IsNotEmpty()
  reportType: string;

  @ApiProperty({
    example: "May oyining mol hisoboti",
    description: "Hisobot tavsifi",
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: "2025-05-31",
    description: "Hisobot yaratilgan sana (YYYY-MM-DD)",
  })
  @IsDateString()
  @IsNotEmpty()
  generatedDate: string;

  @ApiProperty({ example: 15000000, description: "Jami daromad" })
  @IsNumber()
  @IsNotEmpty()
  totalIncome: number;

  @ApiProperty({ example: 5000000, description: "Jami xarajat" })
  @IsNumber()
  @IsNotEmpty()
  totalExpense: number;

  @ApiProperty({ example: 10000000, description: "Sof foyda" })
  @IsNumber()
  @IsNotEmpty()
  netProfit: number;
}
