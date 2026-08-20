import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login-dto';
import { Request, Response } from 'express';
import { UserRole } from "../generated/prisma/enums";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        id: number;
        name: string;
        email: string;
        role: UserRole;
        createdAt: Date;
        updatedAt: Date;
    }>;
    login(logInDto: LoginDto, response: Response): Promise<{
        message: string;
    }>;
    refresh(request: Request, response: Response): Promise<{
        message: string;
    }>;
    logout(request: Request, response: Response): Promise<{
        message: string;
    }>;
    logoutAll(request: Request, response: Response): Promise<{
        message: string;
    }>;
}
