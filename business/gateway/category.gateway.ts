import { injectable } from 'inversify';
import { httpPrivate } from '../../config/http-private';
import { ApiRoutes } from '../shared/config/api-routes.config';
import type { ICategoryGateway } from '../domain/interfaces/i-category.gateway';
import type { CategoryResponseDto, CreateCategoryDto, UpdateCategoryDto } from '../application/dtos/category.dto';

@injectable()
export class CategoryGateway implements ICategoryGateway {
  async findAll(userId: string): Promise<CategoryResponseDto[]> {
    const { data } = await httpPrivate.get<CategoryResponseDto[]>(ApiRoutes.category.findAll, {
      params: { userId },
    });
    return data;
  }

  async create(dto: CreateCategoryDto): Promise<void> {
    await httpPrivate.post(ApiRoutes.category.create, dto);
  }

  async update(dto: UpdateCategoryDto): Promise<void> {
    await httpPrivate.put(ApiRoutes.category.update, dto);
  }

  async delete(id: string): Promise<void> {
    await httpPrivate.delete(ApiRoutes.category.delete, { params: { id } });
  }
}
