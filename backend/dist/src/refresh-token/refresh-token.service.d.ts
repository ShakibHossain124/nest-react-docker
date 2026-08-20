import { ConfigService } from '@nestjs/config';
import { PrismaService } from "../prisma/prisma.service";
import { Prisma } from "../generated/prisma/client";
export declare class RefreshTokenService {
    private readonly prisma;
    private readonly configService;
    constructor(prisma: PrismaService, configService: ConfigService);
    private calculateExpieryDate;
    storeToken(userId: number, refreshToken: string, tx?: Prisma.TransactionClient): Promise<void>;
    validateToken(userId: number, refreshToken: string): Promise<number | false>;
    deleteRefreshToken(tokenId: number, tx?: Prisma.TransactionClient): Promise<void>;
    deleteRefreshTokenOfUser(userId: number): Promise<void>;
    rotate(validTokenId: number, userId: number, newRefreshToken: string): Promise<void>;
}
