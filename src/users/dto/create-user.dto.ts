import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsEmail,
  IsPhoneNumber,
  MinLength,
  MaxLength,
  Matches,
  IsNotEmpty,
} from "class-validator";

export class CreateUserDto {
  @ApiProperty({ example: "Alisher", description: "Foydalanuvchining ismi" })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({
    example: "Karimov",
    description: "Foydalanuvchining familiyasi",
  })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({ example: "alisher@mail.com", description: "Email manzili" })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: "+998901234567", description: "Telefon raqami" })
  @IsPhoneNumber("UZ") // yoki umumiy: @Matches(/^\+998\d{9}$/)
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    example: "StrongPass123!",
    description: "Parol (kamida 6 ta belgi)",
  })
  @IsString()
  @MinLength(6)
  @MaxLength(32)
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: "StrongPass123!",
    description: "Parol tasdig‘i",
  })
  @IsString()
  @MinLength(6)
  @MaxLength(32)
  @IsNotEmpty()
  confrim_password: string;
}
