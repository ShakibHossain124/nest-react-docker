import { PrismaService } from "../prisma/prisma.service";
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ConfigService } from '@nestjs/config';
import { UpdateRoleDto } from './dto/update-role.dto';
import { GetUsersQueryDto } from './dto/get-users-query.dto';
export declare class UsersService {
    private readonly prisma;
    private readonly configService;
    constructor(prisma: PrismaService, configService: ConfigService);
    updateSelf(id: number, body: UpdateUserDto): Promise<{
        name: string;
        email: string;
        password: string;
        role: import("src/generated/prisma/client").UserRole;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteSelf(id: number): Promise<{
        name: string;
        email: string;
        password: string;
        role: import("src/generated/prisma/client").UserRole;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(query: GetUsersQueryDto): Promise<{
        name: string;
        email: string;
        password: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        refreshTokens: {
            hashedToken: string;
        }[];
        _count: {
            refreshTokens: number;
        };
    }[] | {
        data: {
            name: string;
            email: string;
            password: string;
            role: import("src/generated/prisma/client").UserRole;
            id: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    create(createUserDto: CreateUserDto): Promise<{
        name: string;
        email: string;
        password: string;
        role: import("src/generated/prisma/client").UserRole;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findOne(id: number): Promise<{
        name: string;
        email: string;
        role: import("src/generated/prisma/client").UserRole;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<{
        name: string;
        email: string;
        password: string;
        role: import("src/generated/prisma/client").UserRole;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateRole(id: number, dto: UpdateRoleDto): Promise<{
        name: string;
        email: string;
        password: string;
        role: import("src/generated/prisma/client").UserRole;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    delete(id: number): Promise<{
        name: string;
        email: string;
        password: string;
        role: import("src/generated/prisma/client").UserRole;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findByEmail(email: string): Promise<{
        name: string;
        email: string;
        password: string;
        role: import("src/generated/prisma/client").UserRole;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
}
