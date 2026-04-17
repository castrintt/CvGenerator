import type { Container } from 'inversify';
import { AuthenticationSymbols } from '../symbols/authentication.symbols';
import type { IAuthenticationGateway } from '../../domain/interfaces/i-authentication.gateway';
import type { IAuthenticationService } from '../../domain/interfaces/i-authentication.service';
import { AuthenticationGateway } from '../../gateway/authentication.gateway';
import { AuthenticationService } from '../../application/services/authentication.service';

export function bindAuthenticationContainer(container: Container): void {
  container
    .bind<IAuthenticationGateway>(AuthenticationSymbols.AuthenticationGateway)
    .to(AuthenticationGateway)
    .inSingletonScope();

  container
    .bind<IAuthenticationService>(AuthenticationSymbols.AuthenticationService)
    .to(AuthenticationService)
    .inSingletonScope();
}
