import { AuthDto } from '../auth/auth.dto';
import { UserRole } from './user.model';

export class UserDto extends AuthDto {
  role!: UserRole;
  constructor({ role, email, password }: any) {
    super({ email, password });
    this.role = role;
  }
}
