import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  Length,
  IsEmail,
  Matches,
  IsPhoneNumber,
  ValidateIf,
} from "class-validator";

export class CreateAdminDto {
  @ApiProperty({ example: "Ali", description: "Adminning ismi" })
  @IsString()
  @Length(2, 30)
  first_name: string;

  @ApiProperty({ example: "Valiyev", description: "Adminning familiyasi" })
  @IsString()
  @Length(2, 30)
  last_name: string;

  @ApiProperty({
    example: "ali@example.com",
    description: "Admin email manzili",
  })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "+998901234567", description: "Telefon raqami" })
  @IsPhoneNumber("UZ") 
  phone: string;

  @ApiProperty({ example: "StrongPassword123!", description: "Yangi parol" })
  @IsString()
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/, {
    message:
      "Parol kamida 8 ta belgidan iborat bo‘lishi, katta va kichik harf, hamda raqam o‘z ichiga olishi kerak",
  })
  new_password: string;

  @ApiProperty({
    example: "StrongPassword123!",
    description: "Parol tasdiqlanishi",
  })
  @IsString()
  confirim_password: string;
}
