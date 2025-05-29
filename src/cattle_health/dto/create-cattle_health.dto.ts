import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString, IsDateString } from "class-validator";

export class CreateCattleHealthDto {
  @ApiProperty({ example: 1, description: "Molning ID raqami" })
  @IsInt()
  @IsNotEmpty()
  cattle_id: number;

  @ApiProperty({
    example: "2025-05-29",
    description: "Tekshiruv sanasi (YYYY-MM-DD)",
  })
  @IsDateString()
  @IsNotEmpty()
  checkupDate: string;

  @ApiProperty({ example: "Healthy", description: "Sog‘liq holati" })
  @IsString()
  @IsNotEmpty()
  healthStatus: string;

  @ApiProperty({
    example: "No treatment needed",
    description: "Davolash usuli",
  })
  @IsString()
  treatment: string;

  @ApiProperty({
    example: "No issues found during examination",
    description: "Veterinarning izohi",
  })
  @IsString()
  vetNotes: string;
}
