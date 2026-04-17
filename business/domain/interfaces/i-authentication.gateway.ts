import type { AuthenticatedUserDto, LoginCredentialsDto, RegisterCredentialsDto } from '../../application/dtos/authentication.dto';

export interface IAuthenticationGateway {
  login(dto: LoginCredentialsDto): Promise<AuthenticatedUserDto>;
  register(dto: RegisterCredentialsDto): Promise<void>;
}
