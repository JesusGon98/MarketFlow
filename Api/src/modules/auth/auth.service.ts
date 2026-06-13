import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';

export interface AuthenticatedUser {
  id: string;
  storeId: string;
  name: string;
  email: string;
  role: string;
}

export interface LoginResult {
  accessToken: string;
  user: AuthenticatedUser;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async login(dto: LoginDto): Promise<LoginResult> {
    const user = await this.usersService.findByEmail(dto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatches = await bcrypt.compare(dto.password, user.passwordHash);

    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, storeId: user.storeId, role: user.role };

    return {
      accessToken: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        storeId: user.storeId,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}
