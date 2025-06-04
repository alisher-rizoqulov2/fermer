import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Notification } from "../../notifications/entities/notification.entity";
import { v4 as uuidv4 } from "uuid";
import { WorkerTask } from "../../worker_tasks/entities/worker_task.entity";
export enum UserRole {
  ISHCHI = "ishchi",
  VIT = "vit",
  Buxgalter = "Buxgalter",
}

@Entity()
export class User {
  @ApiProperty({ example: 1, description: "Foydalanuvchi ID raqami" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "Ali", description: "Foydalanuvchining ismi" })
  @Column()
  first_name: string;

  @ApiProperty({
    example: "Valiyev",
    description: "Foydalanuvchining familiyasi",
  })
  @Column()
  last_name: string;

  @ApiProperty({
    example: "ali@example.com",
    description: "Foydalanuvchining email manzili",
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    example: "+998901234567",
    description: "Foydalanuvchining telefon raqami",
  })
  @Column()
  phone: string;

  @ApiProperty({
    example: "hashedpassword123",
    description: "Foydalanuvchining paroli (hashed)",
  })
  @Column()
  password: string;

  @ApiProperty({
    example: "",
    description: "Refresh token (hashed)",
    default: " ",
  })
  @Column({ default: " " })
  hashed_refresh_token: string;

  @ApiProperty({
    example: false,
    description: "Foydalanuvchi faollik holati",
    default: false,
  })
  @Column({ default: false })
  is_active: boolean;

  @ApiProperty({
    example: "random-uuid-activation-link",
    description: "Foydalanuvchini email orqali aktivatsiya qilish uchun link",
    default: null,
  })
  @Column({
    type: "uuid",
    default: () => "uuid_generate_v4()",
    nullable: false,
  })
  activation_link: string;

  @ApiProperty({
    example: UserRole.ISHCHI,
    description: 'Foydalanuvchi roli ("ishchi" yoki "vit")',
    enum: UserRole,
    default: UserRole.ISHCHI,
  })
  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.ISHCHI,
  })
  role: UserRole;

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];
  @OneToMany(() => WorkerTask, (task) => task.user)
  workerTasks: WorkerTask[];
}

