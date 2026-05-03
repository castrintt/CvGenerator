export interface UpdateUserDto {
  readonly id: string;
  readonly name: string;
  readonly email: string;
}

export interface UpdatePasswordDto {
  readonly id: string;
  readonly newPassword: string;
}
