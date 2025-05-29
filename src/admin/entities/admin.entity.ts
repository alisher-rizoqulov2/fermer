import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Admin {
  @ApiProperty({ example: 1, description: "Adminning ID raqami" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "Ali", description: "Ismi" })
  @Column()
  first_name: string;

  @ApiProperty({ example: "Valiyev", description: "Familiyasi" })
  @Column()
  last_name: string;

  @ApiProperty({ example: "ali@example.com", description: "Email manzili" })
  @Column()
  email: string;

  @ApiProperty({ example: "+998901234567", description: "Telefon raqami" })
  @Column()
  phone: string;

  @ApiProperty({ example: "hashedpassword123", description: "Parol (hashed)" })
  @Column()
  password: string;

  @ApiProperty({
    example: "",
    description: "Refresh token (hashed)",
    default: "",
  })
  @Column({ default: "" })
  hashed_refresh_token: string;

  @ApiProperty({
    example: false,
    description: "Admin yaratuvchi (creator)mi?",
    default: false,
  })
  @Column({ default: false })
  is_creator: boolean;

  @ApiProperty({ example: true, description: "Faollik holati", default: true })
  @Column({ default: true })
  is_active: boolean;
}
