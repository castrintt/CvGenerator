import { injectable, inject } from 'inversify';
import { AuthenticationSymbols } from '../../ioc/symbols/authentication.symbols';
import type { IAuthenticationService } from '../../domain/interfaces/i-authentication.service';
import type { IAuthenticationGateway } from '../../domain/interfaces/i-authentication.gateway';
import type {
  AuthenticatedUserDto,
  LoginCredentialsDto,
  RegisterCredentialsDto,
} from '../dtos/authentication.dto';

@injectable()
export class AuthenticationService implements IAuthenticationService {
  constructor(
    @inject(AuthenticationSymbols.AuthenticationGateway)
    private readonly gateway: IAuthenticationGateway,
  ) {}

  async loginWithCredentials(dto: LoginCredentialsDto): Promise<AuthenticatedUserDto> {
    return this.gateway.login(dto);
  }

  async registerWithCredentials(dto: RegisterCredentialsDto): Promise<void> {
    return this.gateway.register(dto);
  }

  async logout(): Promise<void> {
    return this.gateway.logout();
  }
}
