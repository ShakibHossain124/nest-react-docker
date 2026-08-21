import { UsersService } from './users.service';
import { UserRole } from "../generated/prisma/enums";
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtPayload } from 'jsonwebtoken';
import { UpdateRoleDto } from './dto/update-role.dto';
import { GetUsersQueryDto } from './dto/get-users-query.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(query: GetUsersQueryDto): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
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
            id: number;
            name: string;
            email: string;
            password: string;
            role: UserRole;
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
    updateSelf(req: JwtPayload, body: UpdateUserDto): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: UserRole;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteSelf(id: number): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: UserRole;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findOne(id: number): Promise<{
        id: number;
        name: string;
        email: string;
        role: UserRole;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: UserRole;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateRole(id: number, role: UpdateRoleDto): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: UserRole;
        createdAt: Date;
        updatedAt: Date;
    }>;
    delete(id: number): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: UserRole;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
