import type { JobApplication } from '../../domain/models/jobApplication.model';
import type { CategoryJobItemDto } from '../dtos/category.dto';

export class JobMapper {
  static toJobApplication(dto: CategoryJobItemDto, categoryId: string): JobApplication {
    return {
      id: dto.id,
      company: dto.enterpriseName,
      position: dto.jobTitle,
      appliedDate: dto.candidatedAt
        ? new Date(dto.candidatedAt).toISOString().slice(0, 10)
        : '',
      link: dto.jobLink,
      notes: dto.observation,
      sectionId: categoryId,
    };
  }
}
