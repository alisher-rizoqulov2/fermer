import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Report } from "./entities/report.entity";
import { CreateReportDto } from "./dto/create-report.dto";
import { UpdateReportDto } from "./dto/update-report.dto";

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>
  ) {}

  async create(createReportDto: CreateReportDto) {
    const report = this.reportRepository.create(createReportDto);
    return await this.reportRepository.save(report);
  }

  async findAll() {
    return await this.reportRepository.find();
  }

  async findOne(id: number) {
    const report = await this.reportRepository.findOne({ where: { id } });
    if (!report) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }
    return report;
  }

  async update(id: number, updateReportDto: UpdateReportDto) {
    const report = await this.reportRepository.preload({
      id,
      ...updateReportDto,
    });
    if (!report) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }
    return await this.reportRepository.save(report);
  }

  async remove(id: number) {
    const report = await this.findOne(id);
    return await this.reportRepository.remove(report);
  }
}
