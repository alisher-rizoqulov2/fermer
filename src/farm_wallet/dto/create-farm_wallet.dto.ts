import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, IsNumber } from "class-validator";

export class CreateFarmWalletDto {
  @ApiProperty({
    example: 0,
    description: "Hisobdagi balans (so‘m)",
    required: false,
  })
  @IsNumber()
  @IsOptional()
  balance?: number;

  @ApiProperty({ example: "UZS", description: "Valyuta kodi", required: false })
  @IsString()
  @IsOptional()
  currency?: string;
}
