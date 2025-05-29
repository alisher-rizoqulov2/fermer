import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty({
    example: "admin@example.com",
    description: "Admin email manzili",
  })
  email: string;

  @ApiProperty({
    example: "StrongPassword123!",
    description: "Admin paroli",
  })
  password: string;
}
