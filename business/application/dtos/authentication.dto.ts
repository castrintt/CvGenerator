export interface LoginCredentialsDto {
  readonly email: string;
  readonly password: string;
}

export interface RegisterCredentialsDto {
  readonly name: string;
  readonly email: string;
  readonly password: string;
}

export interface AuthenticatedUserDto {
  readonly id: string;
  readonly name: string;
  readonly email: string;
}
