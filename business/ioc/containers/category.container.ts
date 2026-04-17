import type { Container } from 'inversify';
import { CategorySymbols } from '../symbols/category.symbols';
import type { ICategoryGateway } from '../../domain/interfaces/i-category.gateway';
import type { ICategoryService } from '../../domain/interfaces/i-category.service';
import { CategoryGateway } from '../../gateway/category.gateway';
import { CategoryService } from '../../application/services/category.service';

export function bindCategoryContainer(container: Container): void {
  container
    .bind<ICategoryGateway>(CategorySymbols.CategoryGateway)
    .to(CategoryGateway)
    .inSingletonScope();

  container
    .bind<ICategoryService>(CategorySymbols.CategoryService)
    .to(CategoryService)
    .inSingletonScope();
}
