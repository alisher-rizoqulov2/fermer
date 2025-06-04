import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, IsDateString, IsNotEmpty } from "class-validator";

export class CreateWorkerTaskDto {
  @ApiProperty({
    description: "ID of the user assigned the task",
    example: 123,
    type: Number,
  })
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    description: "Description of the task",
    example: "Fix the server downtime issue",
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  task_description: string;

  @ApiProperty({
    description: "Date when the task is assigned (ISO 8601 format)",
    example: "2025-06-03T12:00:00Z",
    type: String,
    format: "date-time",
  })
  @IsDateString()
  @IsNotEmpty()
  assigned_date: string;

  @ApiProperty({
    description: "Due date for the task completion (ISO 8601 format)",
    example: "2025-06-10T17:00:00Z",
    type: String,
    format: "date-time",
  })
  @IsDateString()
  @IsNotEmpty()
  due_date: string;

  @ApiProperty({
    description: "Current status of the task",
    example: "in_progress",
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  status: string;
}
