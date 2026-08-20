"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt_1 = __importDefault(require("bcrypt"));
let RefreshTokenService = class RefreshTokenService {
    prisma;
    configService;
    constructor(prisma, configService) {
        this.prisma = prisma;
        this.configService = configService;
    }
    calculateExpieryDate(expieryDateValue) {
        const value = Number(expieryDateValue.slice(0, -1));
        const unit = expieryDateValue.slice(-1);
        const currentTime = Date.now();
        switch (unit) {
            case 'd':
                return new Date(currentTime + value * 24 * 60 * 60 * 1000);
            case 'h':
                return new Date(currentTime + value * 60 * 60 * 1000);
            case 'm':
                return new Date(currentTime + value * 60 * 1000);
            case 's':
                return new Date(currentTime + value * 1000);
            default:
                throw new Error('Invalid JWT_REFRESH_EXPIRES_IN format');
        }
    }
    async storeToken(userId, refreshToken, tx = this.prisma) {
        const saltRounds = Number(this.configService.getOrThrow('BCRYPT_SALT_ROUND'));
        const hashedToken = await bcrypt_1.default.hash(refreshToken, saltRounds);
        const expieryDateValue = this.configService.getOrThrow('JWT_REFRESH_EXPIRES_IN');
        const expieryDate = this.calculateExpieryDate(expieryDateValue);
        await tx.refreshToken.create({
            data: {
                userId: userId,
                hashedToken: hashedToken,
                expiresAt: expieryDate,
            },
        });
    }
    async validateToken(userId, refreshToken) {
        const hashTokenRows = await this.prisma.refreshToken.findMany({
            where: { userId },
        });
        for (const token of hashTokenRows) {
            const valid = await bcrypt_1.default.compare(refreshToken, token.hashedToken);
            if (valid)
                return token.id;
        }
        return false;
    }
    async deleteRefreshToken(tokenId, tx = this.prisma) {
        await tx.refreshToken.delete({ where: { id: tokenId } });
    }
    async deleteRefreshTokenOfUser(userId) {
        await this.prisma.refreshToken.deleteMany({ where: { userId } });
    }
    async rotate(validTokenId, userId, newRefreshToken) {
        await this.prisma.$transaction(async (tx) => {
            await this.deleteRefreshToken(validTokenId, tx);
            await this.storeToken(userId, newRefreshToken, tx);
        });
    }
};
exports.RefreshTokenService = RefreshTokenService;
exports.RefreshTokenService = RefreshTokenService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], RefreshTokenService);
//# sourceMappingURL=refresh-token.service.js.map