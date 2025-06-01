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
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CattleProfitLossService } from "./cattle_profit_loss.service";
import { CreateCattleProfitLossDto } from "./dto/create-cattle_profit_loss.dto";
import { UpdateCattleProfitLossDto } from "./dto/update-cattle_profit_loss.dto";
import { authGuard } from "../common/guard/auth.guard";

@ApiTags("cattle-profit-loss")
@Controller("cattle-profit-loss")
export class CattleProfitLossController {
  constructor(
    private readonly cattleProfitLossService: CattleProfitLossService
  ) {}

  @Post()
  @UseGuards(authGuard)
  @ApiOperation({ summary: "Create a new cattle profit/loss record" })
  create(@Body() createCattleProfitLossDto: CreateCattleProfitLossDto) {
    return this.cattleProfitLossService.create(createCattleProfitLossDto);
  }

  @Get()
  @UseGuards(authGuard)
  @ApiOperation({ summary: "Get all cattle profit/loss records" })
  findAll() {
    return this.cattleProfitLossService.findAll();
  }

  @Get(":id")
  @UseGuards(authGuard)
  @ApiOperation({ summary: "Get a cattle profit/loss record by ID" })
  findOne(@Param("id") id: string) {
    return this.cattleProfitLossService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(authGuard)
  @ApiOperation({ summary: "Update a cattle profit/loss record by ID" })
  update(
    @Param("id") id: string,
    @Body() updateCattleProfitLossDto: UpdateCattleProfitLossDto
  ) {
    return this.cattleProfitLossService.update(+id, updateCattleProfitLossDto);
  }

  @Delete(":id")
  @UseGuards(authGuard)
  @ApiOperation({ summary: "Delete a cattle profit/loss record by ID" })
  remove(@Param("id") id: string) {
    return this.cattleProfitLossService.remove(+id);
  }
}
