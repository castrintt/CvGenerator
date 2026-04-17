import type { AuthenticatedUserDto, LoginCredentialsDto, RegisterCredentialsDto } from '../../application/dtos/authentication.dto';

export interface IAuthenticationService {
  loginWithCredentials(dto: LoginCredentialsDto): Promise<AuthenticatedUserDto>;
  registerWithCredentials(dto: RegisterCredentialsDto): Promise<void>;
}
