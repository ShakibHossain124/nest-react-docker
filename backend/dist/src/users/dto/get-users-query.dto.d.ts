import { UserRole } from "../../generated/prisma/enums";
export declare class GetUsersQueryDto {
    page?: number;
    limit?: number;
    order?: 'asc' | 'desc';
    sortBy?: 'id' | 'name' | 'email' | 'createdAt';
    role?: UserRole;
    search?: string;
}
