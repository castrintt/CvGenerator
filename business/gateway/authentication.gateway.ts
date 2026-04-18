import { injectable } from 'inversify';
import { httpPublic } from '../../config/http-public';
import { ApiRoutes } from '../shared/config/api-routes.config';
import type { IAuthenticationGateway } from '../domain/interfaces/i-authentication.gateway';
import type {
  AuthenticatedUserDto,
  LoginCredentialsDto,
  RegisterCredentialsDto,
} from '../application/dtos/authentication.dto';

@injectable()
export class AuthenticationGateway implements IAuthenticationGateway {
  async login(dto: LoginCredentialsDto): Promise<AuthenticatedUserDto> {
    const { data } = await httpPublic.post<AuthenticatedUserDto>(ApiRoutes.auth.signIn, dto);
    return data;
  }

  async register(dto: RegisterCredentialsDto): Promise<void> {
    await httpPublic.post(ApiRoutes.user.create, dto);
  }

  async logout(): Promise<void> {
    await httpPublic.post(ApiRoutes.auth.logout);
  }
}
