import { injectable, inject } from 'inversify';
import { JobSymbols } from '../../ioc/symbols/job.symbols';
import type { IJobService } from '../../domain/interfaces/i-job.service';
import type { IJobGateway } from '../../domain/interfaces/i-job.gateway';
import type { CreateJobDto, SwitchJobCategoryDto, UpdateJobDto } from '../dtos/job.dto';

@injectable()
export class JobService implements IJobService {
  constructor(
    @inject(JobSymbols.JobGateway)
    private readonly gateway: IJobGateway,
  ) {}

  async createJob(dto: CreateJobDto): Promise<void> {
    return this.gateway.create(dto);
  }

  async updateJob(dto: UpdateJobDto): Promise<void> {
    return this.gateway.update(dto);
  }

  async deleteJob(id: string): Promise<void> {
    return this.gateway.delete(id);
  }

  async switchJobCategory(dto: SwitchJobCategoryDto): Promise<void> {
    return this.gateway.switchCategory(dto);
  }
}
