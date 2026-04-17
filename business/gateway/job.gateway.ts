import { injectable } from 'inversify';
import { httpPrivate } from '../../config/http-private';
import { ApiRoutes } from '../shared/config/api-routes.config';
import type { IJobGateway } from '../domain/interfaces/i-job.gateway';
import type { CreateJobDto, SwitchJobCategoryDto, UpdateJobDto } from '../application/dtos/job.dto';

@injectable()
export class JobGateway implements IJobGateway {
  async create(dto: CreateJobDto): Promise<void> {
    await httpPrivate.post(ApiRoutes.job.create, dto);
  }

  async update(dto: UpdateJobDto): Promise<void> {
    await httpPrivate.put(ApiRoutes.job.update, dto);
  }

  async delete(id: string): Promise<void> {
    await httpPrivate.delete(ApiRoutes.job.delete, { params: { id } });
  }

  async switchCategory(dto: SwitchJobCategoryDto): Promise<void> {
    await httpPrivate.put(ApiRoutes.job.switchCategory, dto);
  }
}
