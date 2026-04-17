import type { CreateJobDto, SwitchJobCategoryDto, UpdateJobDto } from '../../application/dtos/job.dto';

export interface IJobGateway {
  create(dto: CreateJobDto): Promise<void>;
  update(dto: UpdateJobDto): Promise<void>;
  delete(id: string): Promise<void>;
  switchCategory(dto: SwitchJobCategoryDto): Promise<void>;
}
