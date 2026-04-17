import type { CategoryResponseDto, CreateCategoryDto, UpdateCategoryDto } from '../../application/dtos/category.dto';

export interface ICategoryGateway {
  findAll(userId: string): Promise<CategoryResponseDto[]>;
  create(dto: CreateCategoryDto): Promise<void>;
  update(dto: UpdateCategoryDto): Promise<void>;
  delete(id: string): Promise<void>;
}
