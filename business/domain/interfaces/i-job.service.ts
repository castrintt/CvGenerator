import type { CreateJobDto, SwitchJobCategoryDto, UpdateJobDto } from '../../application/dtos/job.dto';

export interface IJobService {
  createJob(dto: CreateJobDto): Promise<void>;
  updateJob(dto: UpdateJobDto): Promise<void>;
  deleteJob(id: string): Promise<void>;
  switchJobCategory(dto: SwitchJobCategoryDto): Promise<void>;
}
