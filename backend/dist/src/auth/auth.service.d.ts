import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login-dto';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { UserRole } from "../generated/prisma/client";
import { RefreshTokenService } from "../refresh-token/refresh-token.service";
export declare class AuthService {
    private readonly userService;
    private readonly configService;
    private readonly jwtService;
    private readonly refreshTokenService;
    constructor(userService: UsersService, configService: ConfigService, jwtService: JwtService, refreshTokenService: RefreshTokenService);
    private generateAccessToken;
    private generateRefreshToken;
    refresh(token: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    register(registerDto: RegisterDto): Promise<{
        id: number;
        name: string;
        email: string;
        role: UserRole;
        createdAt: Date;
        updatedAt: Date;
    }>;
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(refreshToken: string): Promise<void>;
    logoutAll(refreshToken: string): Promise<void>;
}
