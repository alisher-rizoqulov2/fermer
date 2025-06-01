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
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { CattleHealthService } from "./cattle_health.service";
import { CreateCattleHealthDto } from "./dto/create-cattle_health.dto";
import { UpdateCattleHealthDto } from "./dto/update-cattle_health.dto";
import { CattleHealth } from "./entities/cattle_health.entity";
import { authGuard } from "../common/guard/auth.guard";

@ApiTags("cattle-health")
@Controller("cattle-health")
export class CattleHealthController {
  constructor(private readonly cattleHealthService: CattleHealthService) {}

  @Post()
  @UseGuards(authGuard)
  @ApiOperation({ summary: "Create a new cattle health record" })
  @ApiResponse({
    status: 201,
    description: "Record created successfully.",
    type: CattleHealth,
  })
  create(@Body() createCattleHealthDto: CreateCattleHealthDto) {
    return this.cattleHealthService.create(createCattleHealthDto);
  }

  @Get()
  @UseGuards(authGuard)
  @ApiOperation({ summary: "Get all cattle health records" })
  @ApiResponse({
    status: 200,
    description: "List of all health records",
    type: [CattleHealth],
  })
  findAll() {
    return this.cattleHealthService.findAll();
  }

  @Get(":id")
  @UseGuards(authGuard)
  @ApiOperation({ summary: "Get a cattle health record by ID" })
  @ApiParam({
    name: "id",
    type: Number,
    description: "ID of the cattle health record",
  })
  @ApiResponse({
    status: 200,
    description: "The found record",
    type: CattleHealth,
  })
  @ApiResponse({ status: 404, description: "Record not found" })
  findOne(@Param("id") id: string) {
    return this.cattleHealthService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(authGuard)
  @ApiOperation({ summary: "Update a cattle health record by ID" })
  @ApiParam({
    name: "id",
    type: Number,
    description: "ID of the record to update",
  })
  @ApiResponse({
    status: 200,
    description: "Record updated successfully",
    type: CattleHealth,
  })
  @ApiResponse({ status: 404, description: "Record not found" })
  update(
    @Param("id") id: string,
    @Body() updateCattleHealthDto: UpdateCattleHealthDto
  ) {
    return this.cattleHealthService.update(+id, updateCattleHealthDto);
  }

  @Delete(":id")
  @UseGuards(authGuard)
  @ApiOperation({ summary: "Delete a cattle health record by ID" })
  @ApiParam({
    name: "id",
    type: Number,
    description: "ID of the record to delete",
  })
  @ApiResponse({ status: 200, description: "Record deleted successfully" })
  @ApiResponse({ status: 404, description: "Record not found" })
  remove(@Param("id") id: string) {
    return this.cattleHealthService.remove(+id);
  }
}
