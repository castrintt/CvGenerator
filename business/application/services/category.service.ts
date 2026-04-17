import { injectable, inject } from 'inversify';
import { CategorySymbols } from '../../ioc/symbols/category.symbols';
import type { ICategoryService } from '../../domain/interfaces/i-category.service';
import type { ICategoryGateway } from '../../domain/interfaces/i-category.gateway';
import type { Section } from '../../domain/models/section.model';
import type { JobApplication } from '../../domain/models/jobApplication.model';
import type { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto';
import { CategoryMapper } from '../mappers/category.mapper';

@injectable()
export class CategoryService implements ICategoryService {
  constructor(
    @inject(CategorySymbols.CategoryGateway)
    private readonly gateway: ICategoryGateway,
  ) {}

  async findAllCategories(userId: string): Promise<{ sections: Section[]; jobApplications: JobApplication[] }> {
    const dtos = await this.gateway.findAll(userId);
    const sections = dtos.map(CategoryMapper.toSection);
    const jobApplications = dtos.flatMap(CategoryMapper.toJobApplications);
    return { sections, jobApplications };
  }

  async createCategory(dto: CreateCategoryDto): Promise<void> {
    return this.gateway.create(dto);
  }

  async updateCategory(dto: UpdateCategoryDto): Promise<void> {
    return this.gateway.update(dto);
  }

  async deleteCategory(id: string): Promise<void> {
    return this.gateway.delete(id);
  }
}
