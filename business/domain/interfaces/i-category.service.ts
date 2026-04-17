import type { Section } from '../models/section.model';
import type { JobApplication } from '../models/jobApplication.model';
import type { CreateCategoryDto, UpdateCategoryDto } from '../../application/dtos/category.dto';

export interface ICategoryService {
  findAllCategories(userId: string): Promise<{ sections: Section[]; jobApplications: JobApplication[] }>;
  createCategory(dto: CreateCategoryDto): Promise<void>;
  updateCategory(dto: UpdateCategoryDto): Promise<void>;
  deleteCategory(id: string): Promise<void>;
}
