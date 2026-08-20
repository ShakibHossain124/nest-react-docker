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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const public_decorator_1 = require("../common/decorators/public.decorator");
const config_1 = require("@nestjs/config");
let AuthGuard = class AuthGuard {
    reflector;
    jwtService;
    configService;
    constructor(reflector, jwtService, configService) {
        this.reflector = reflector;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const isPublic = this.reflector.getAllAndOverride(public_decorator_1.PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic)
            return true;
        const token = req.cookies['access-token'];
        if (!token)
            throw new common_1.UnauthorizedException('No valid token');
        try {
            const payload = this.jwtService.verify(token);
            req.user = payload;
        }
        catch (error) {
            throw new common_1.UnauthorizedException("Don't have valid token");
        }
        return true;
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthGuard);
//# sourceMappingURL=auth-guard.service.js.map