import type { UpdateUserDto, UpdatePasswordDto } from '../../application/dtos/user.dto';

export interface IUserGateway {
  updatePersonalData(dto: UpdateUserDto): Promise<void>;
  updatePassword(dto: UpdatePasswordDto): Promise<void>;
}
