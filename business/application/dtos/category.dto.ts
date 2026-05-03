export interface CategoryJobItemDto {
  readonly id: string;
  readonly enterpriseName: string;
  readonly jobTitle: string;
  readonly candidatedAt: string;
  readonly jobLink?: string;
  readonly observation?: string;
}

export interface CategoryResponseDto {
  readonly id: string;
  readonly name: string;
  readonly order: number;
  readonly jobs: CategoryJobItemDto[];
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface CreateCategoryDto {
  readonly userId: string;
  readonly name: string;
  readonly order: number;
}

export interface UpdateCategoryDto {
  readonly id: string;
  readonly name: string;
  readonly order: number;
}
