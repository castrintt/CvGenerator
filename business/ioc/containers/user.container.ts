import type { Container } from 'inversify';
import { UserSymbols } from '../symbols/user.symbols';
import type { IUserGateway } from '../../domain/interfaces/i-user.gateway';
import type { IUserService } from '../../domain/interfaces/i-user.service';
import { UserGateway } from '../../gateway/user.gateway';
import { UserService } from '../../application/services/user.service';

export function bindUserContainer(container: Container): void {
  container
    .bind<IUserGateway>(UserSymbols.UserGateway)
    .to(UserGateway)
    .inSingletonScope();

  container
    .bind<IUserService>(UserSymbols.UserService)
    .to(UserService)
    .inSingletonScope();
}
