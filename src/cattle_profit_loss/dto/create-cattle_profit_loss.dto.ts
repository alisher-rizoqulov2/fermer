import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber, IsDateString } from "class-validator";

export class CreateCattleProfitLossDto {
  @ApiProperty({ example: 1, description: "Molning ID raqami" })
  @IsInt()
  @IsNotEmpty()
  cattle_id: number;

  @ApiProperty({ example: 1500000.5, description: "Umumiy xarajatlar (so‘m)" })
  @IsNumber()
  @IsNotEmpty()
  totalExpense: number;

  @ApiProperty({ example: 2000000.0, description: "Sotish narxi (so‘m)" })
  @IsNumber()
  @IsNotEmpty()
  salePrice: number;

  @ApiProperty({ example: 500000.0, description: "Foyda (so‘m)" })
  @IsNumber()
  @IsNotEmpty()
  profit: number;

  @ApiProperty({
    example: "2025-05-29",
    description: "Hisoblangan sana (YYYY-MM-DD)",
  })
  @IsDateString()
  @IsNotEmpty()
  calculatedDate: string;
}
