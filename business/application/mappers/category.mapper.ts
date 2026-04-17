import type { SectionColorKey as CategoryColorKey, Section } from '../../domain/models/section.model';
import type { CategoryResponseDto } from '../dtos/category.dto';
import type { JobApplication } from '../../domain/models/jobApplication.model';
import { JobMapper } from './job.mapper';

const COLOR_KEY_BY_ORDER: CategoryColorKey[] = [
  'applied',
  'in_progress',
  'positive_feedback',
  'rejected',
];

export class CategoryMapper {
  static toSection(dto: CategoryResponseDto): Section {
    const colorKey: CategoryColorKey = COLOR_KEY_BY_ORDER[dto.order] ?? 'custom';
    return {
      id: dto.id,
      name: dto.name,
      order: dto.order,
      colorKey,
    };
  }

  static toJobApplications(dto: CategoryResponseDto): JobApplication[] {
    return dto.jobs.map((jobItem) => JobMapper.toJobApplication(jobItem, dto.id));
  }
}
