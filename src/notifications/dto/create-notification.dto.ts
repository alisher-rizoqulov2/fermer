import { ApiProperty } from "@nestjs/swagger";
import {
  IsInt,
  IsString,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
} from "class-validator";

export class CreateNotificationDto {
  @ApiProperty({ example: 1, description: "Foydalanuvchi ID raqami" })
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    example: "Yangi xabar",
    description: "Bildirishnoma sarlavhasi",
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: "Sizga yangi vazifa berildi",
    description: "Bildirishnoma matni",
  })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({
    example: false,
    description: "O‘qilganligi holati",
    required: false,
  })
  @IsBoolean()
  isRead: boolean;
}
