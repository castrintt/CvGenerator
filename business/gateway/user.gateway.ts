import { injectable } from 'inversify';
import { httpPrivate } from '../../config/http-private';
import { ApiRoutes } from '../shared/config/api-routes.config';
import type { IUserGateway } from '../domain/interfaces/i-user.gateway';
import type { UpdateUserDto, UpdatePasswordDto } from '../application/dtos/user.dto';

@injectable()
export class UserGateway implements IUserGateway {
  async updatePersonalData(dto: UpdateUserDto): Promise<void> {
    await httpPrivate.put(ApiRoutes.user.update, { name: dto.name, email: dto.email }, {
      params: { id: dto.id },
    });
  }

  async updatePassword(dto: UpdatePasswordDto): Promise<void> {
    await httpPrivate.put(ApiRoutes.user.updatePassword, { password: dto.newPassword }, {
      params: { id: dto.id },
    });
  }
}
