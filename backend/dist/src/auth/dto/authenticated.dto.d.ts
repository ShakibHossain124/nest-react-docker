import { Request } from 'express';
import { UserRole } from "../../generated/prisma/enums";
export interface JwtPayload {
    sub: number;
    email: string;
    name: string;
    role: UserRole;
}
export interface AuthenticatedRequest extends Request {
    user: JwtPayload;
}
