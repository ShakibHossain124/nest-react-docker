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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const refresh_token_service_1 = require("../refresh-token/refresh-token.service");
let AuthService = class AuthService {
    userService;
    configService;
    jwtService;
    refreshTokenService;
    constructor(userService, configService, jwtService, refreshTokenService) {
        this.userService = userService;
        this.configService = configService;
        this.jwtService = jwtService;
        this.refreshTokenService = refreshTokenService;
    }
    generateAccessToken(user) {
        return this.jwtService.sign({
            sub: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            type: 'access',
        });
    }
    generateRefreshToken(userId) {
        return this.jwtService.sign({
            sub: userId,
            type: 'refresh',
        }, {
            secret: this.configService.getOrThrow('JWT_REFRESH_SECRET'),
            expiresIn: this.configService.getOrThrow('JWT_REFRESH_EXPIRES_IN'),
        });
    }
    async refresh(token) {
        const refreshSecret = this.configService.getOrThrow('JWT_REFRESH_SECRET');
        let payload;
        try {
            payload = this.jwtService.verify(token, { secret: refreshSecret });
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
        const userId = payload.sub;
        const type = payload.type;
        const validTokenId = await this.refreshTokenService.validateToken(userId, token);
        if (!validTokenId)
            throw new common_1.UnauthorizedException('not a matched refresh token');
        if (type !== 'refresh')
            throw new common_1.UnauthorizedException('not a matched refresh token role');
        const user = await this.userService.findOne(userId);
        const newRefreshToken = this.generateRefreshToken(user.id);
        const newAccessToken = this.generateAccessToken(user);
        await this.refreshTokenService.rotate(validTokenId, userId, newRefreshToken);
        return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    }
    async register(registerDto) {
        const existingUser = await this.userService.findByEmail(registerDto.email);
        if (existingUser)
            throw new common_1.ConflictException('Email already registered');
        const saltRounds = Number(this.configService.getOrThrow('BCRYPT_SALT_ROUND'));
        const hashedPassword = await bcrypt_1.default.hash(registerDto.password, saltRounds);
        const newUserData = {
            name: registerDto.name,
            email: registerDto.email,
            password: hashedPassword,
        };
        const response = await this.userService.create(newUserData);
        return {
            id: response.id,
            name: response.name,
            email: response.email,
            role: response.role,
            createdAt: response.createdAt,
            updatedAt: response.updatedAt,
        };
    }
    async login(loginDto) {
        const user = await this.userService.findByEmail(loginDto.email);
        if (!user)
            throw new common_1.NotAcceptableException('Wrong email or pass');
        const userPass = user.password;
        const isMatched = await bcrypt_1.default.compare(loginDto.password, userPass);
        if (!isMatched)
            throw new common_1.UnauthorizedException('Wrong email or pass');
        const accessToken = this.generateAccessToken(user);
        const refreshToken = this.generateRefreshToken(user.id);
        await this.refreshTokenService.storeToken(user.id, refreshToken);
        return { accessToken, refreshToken };
    }
    async logout(refreshToken) {
        const refreshSecret = this.configService.getOrThrow('JWT_REFRESH_SECRET');
        try {
            const payload = this.jwtService.verify(refreshToken, {
                secret: refreshSecret,
            });
            const userId = payload.sub;
            const type = payload.type;
            const validTokenId = await this.refreshTokenService.validateToken(userId, refreshToken);
            if (!validTokenId)
                throw new common_1.UnauthorizedException('not a matched refresh token');
            if (type !== 'refresh')
                throw new common_1.UnauthorizedException('not a matched refresh token role');
            await this.refreshTokenService.deleteRefreshToken(validTokenId);
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid Refresh Token');
        }
    }
    async logoutAll(refreshToken) {
        const refreshSecret = this.configService.getOrThrow('JWT_REFRESH_SECRET');
        try {
            const payload = this.jwtService.verify(refreshToken, {
                secret: refreshSecret,
            });
            const userId = payload.sub;
            const type = payload.type;
            const validTokenId = await this.refreshTokenService.validateToken(userId, refreshToken);
            if (!validTokenId)
                throw new common_1.UnauthorizedException('not a matched refresh token');
            if (type !== 'refresh')
                throw new common_1.UnauthorizedException('not a matched refresh token role');
            await this.refreshTokenService.deleteRefreshTokenOfUser(userId);
        }
        catch (error) {
            throw new common_1.UnauthorizedException(error);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        config_1.ConfigService,
        jwt_1.JwtService,
        refresh_token_service_1.RefreshTokenService])
], AuthService);
//# sourceMappingURL=auth.service.js.map