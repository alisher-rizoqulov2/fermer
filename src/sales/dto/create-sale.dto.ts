import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsString, IsNotEmpty } from "class-validator";

export class CreateSaleDto {
  @ApiProperty({
    example: "2025-05-28",
    description: "Sotuv sanasi (YYYY-MM-DD)",
  })
  @IsDateString()
  @IsNotEmpty()
  saleDate: string;

  @ApiProperty({ example: 18000000, description: "Sotuv narxi (so'mda)" })
  @IsNumber()
  @IsNotEmpty()
  salePrice: number;

  @ApiProperty({
    example: "Ali Murodov, Toshkent",
    description: "Xaridor haqida ma'lumot",
  })
  @IsString()
  @IsNotEmpty()
  buyerInfo: string;

  @ApiProperty({ example: 3000000, description: "Foyda miqdori (so'mda)" })
  @IsNumber()
  @IsNotEmpty()
  profit: number;

  @ApiProperty({ example: 1, description: "Molning ID raqami" })
  @IsNumber()
  @IsNotEmpty()
  cattleId: number;
}
