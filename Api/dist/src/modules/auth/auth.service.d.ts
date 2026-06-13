import { JwtService } from '@nestjs/jwt';
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
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    login(dto: LoginDto): Promise<LoginResult>;
}
