import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  Length,
  IsDateString,
  IsOptional,
  IsNumber,
  IsPositive,
  IsIn,
} from "class-validator";

export class CreateCattleDto {
  @ApiProperty({
    example: "UZ-12345",
    description: "Molning tag raqami (unikal)",
  })
  @IsString()
  @Length(3, 20)
  tag_number: string;

  @ApiProperty({ example: "Simmental", description: "Mol zotining nomi" })
  @IsString()
  @Length(2, 50)
  breed: string;

  @ApiProperty({ example: "2022-05-15", description: "Tug‘ilgan sana" })
  @IsDateString()
  birth_date: string;

  @ApiProperty({
    example: "2023-01-10",
    description: "Sotib olingan sana",
    required: false,
  })
  @IsOptional()
  @IsDateString()
  purchase_date?: string;

  @ApiProperty({
    example: 12000000,
    description: "Sotib olingan narxi (so‘m)",
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  purchase_price?: number;

  @ApiProperty({
    example: "active",
    description: "Molning holati (active, sold, dead)",
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsIn(["active", "sold", "dead"])
  status?: string;
}
