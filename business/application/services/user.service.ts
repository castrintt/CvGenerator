import { injectable, inject } from 'inversify';
import type { IUserService } from '../../domain/interfaces/i-user.service';
import type { IUserGateway } from '../../domain/interfaces/i-user.gateway';
import type { UpdateUserDto, UpdatePasswordDto } from '../dtos/user.dto';
import { UserSymbols } from '../../ioc/symbols/user.symbols';

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(UserSymbols.UserGateway)
    private readonly gateway: IUserGateway,
  ) {}

  async updatePersonalData(dto: UpdateUserDto): Promise<void> {
    return this.gateway.updatePersonalData(dto);
  }

  async updatePassword(dto: UpdatePasswordDto): Promise<void> {
    return this.gateway.updatePassword(dto);
  }
}
