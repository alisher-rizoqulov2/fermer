import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class WorkerTask {
  @ApiProperty({ description: "Unique identifier of the task", example: "1" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: "User assigned to the task", type: () => User })
  @ManyToOne(() => User, (user) => user.workerTasks)
  user: User;

  @ApiProperty({
    description: "Description of the task",
    example: "Fix the server issue",
  })
  @Column()
  task_description: string;

  @ApiProperty({
    description: "Date when the task was assigned",
    example: "2025-06-03",
    format: "date",
  })
  @Column({ type: "date" })
  assigned_date: Date;

  @ApiProperty({
    description: "Due date of the task",
    example: "2025-06-10",
    format: "date",
  })
  @Column({ type: "date" })
  due_date: Date;

  @ApiProperty({
    description: "Current status of the task",
    example: "in_progress",
  })
  @Column()
  status: string;
}
