export interface CreateJobDto {
  readonly enterpriseName: string;
  readonly jobTitle: string;
  readonly candidatedAt: string;
  readonly jobLink: string;
  readonly observation: string;
  readonly categoryId: string;
}

export interface UpdateJobDto {
  readonly id: string;
  readonly enterpriseName: string;
  readonly jobTitle: string;
  readonly candidatedAt: string;
  readonly jobLink: string;
  readonly observation: string;
}

export interface SwitchJobCategoryDto {
  readonly id: string;
  readonly categoryId: string;
}
