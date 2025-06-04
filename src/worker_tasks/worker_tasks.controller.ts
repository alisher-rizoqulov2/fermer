import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { WorkerTasksService } from "./worker_tasks.service";
import { CreateWorkerTaskDto } from "./dto/create-worker_task.dto";
import { UpdateWorkerTaskDto } from "./dto/update-worker_task.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { adminGuard } from "../common/guard/admin.guard";
import { authGuard } from "../common/guard/auth.guard";
import { userIschiGuard } from "../common/guard/userIshchi.guard";

@ApiTags("worker-tasks")
@ApiBearerAuth("accessToken")

@Controller("worker-tasks")
export class WorkerTasksController {
  constructor(private readonly workerTasksService: WorkerTasksService) {}

  @Post()
  @UseGuards(adminGuard)
  @UseGuards(authGuard)
  @ApiOperation({ summary: "Create a new worker task" })
  @ApiBody({ type: CreateWorkerTaskDto })
  @ApiResponse({
    status: 201,
    description: "The task has been successfully created.",
  })
  create(@Body() createWorkerTaskDto: CreateWorkerTaskDto) {
    return this.workerTasksService.create(createWorkerTaskDto);
  }

  @Get()
  @UseGuards(userIschiGuard)
  @UseGuards(authGuard)
  @ApiOperation({ summary: "Get all worker tasks" })
  @ApiResponse({
    status: 200,
    description: "List of all worker tasks.",
    type: [CreateWorkerTaskDto],
  })
  findAll() {
    return this.workerTasksService.findAll();
  }

  @Get(":id")
  @UseGuards(userIschiGuard)
  @UseGuards(authGuard)
  @ApiOperation({ summary: "Get a worker task by id" })
  @ApiParam({ name: "id", type: Number, description: "Task ID" })
  @ApiResponse({
    status: 200,
    description: "The found task.",
    type: CreateWorkerTaskDto,
  })
  @ApiResponse({ status: 404, description: "Task not found." })
  findOne(@Param("id") id: string) {
    return this.workerTasksService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(adminGuard)
  @UseGuards(authGuard)
  @ApiOperation({ summary: "Update a worker task" })
  @ApiParam({ name: "id", type: Number, description: "Task ID" })
  @ApiBody({ type: UpdateWorkerTaskDto })
  @ApiResponse({
    status: 200,
    description: "The task has been successfully updated.",
  })
  @ApiResponse({ status: 404, description: "Task not found." })
  update(
    @Param("id") id: string,
    @Body() updateWorkerTaskDto: UpdateWorkerTaskDto
  ) {
    return this.workerTasksService.update(+id, updateWorkerTaskDto);
  }

  @Delete(":id")
  @UseGuards(adminGuard)
  @UseGuards(authGuard)
  @ApiOperation({ summary: "Delete a worker task" })
  @ApiParam({ name: "id", type: Number, description: "Task ID" })
  @ApiResponse({
    status: 200,
    description: "The task has been successfully deleted.",
  })
  @ApiResponse({ status: 404, description: "Task not found." })
  remove(@Param("id") id: string) {
    return this.workerTasksService.remove(+id);
  }
}
