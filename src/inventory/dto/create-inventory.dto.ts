import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsDateString, IsNotEmpty } from "class-validator";

export class CreateInventoryDto {
  @ApiProperty({ example: "Soya urug‘i", description: "Mahsulot nomi" })
  @IsString()
  @IsNotEmpty()
  itemName: string;

  @ApiProperty({ example: 100.5, description: "Miqdor" })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({ example: "kg", description: "O‘lchov birligi" })
  @IsString()
  @IsNotEmpty()
  unit: string;

  @ApiProperty({
    example: "2025-05-29",
    description: "Qo‘shilgan sana (YYYY-MM-DD)",
  })
  @IsDateString()
  @IsNotEmpty()
  addedDate: string;
}
