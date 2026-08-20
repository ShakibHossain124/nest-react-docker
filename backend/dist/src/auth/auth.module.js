"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const users_module_1 = require("../users/users.module");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const auth_guard_service_1 = require("./auth-guard.service");
const core_1 = require("@nestjs/core");
const refresh_token_module_1 = require("../refresh-token/refresh-token.module");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            auth_guard_service_1.AuthGuard,
            { provide: core_1.APP_GUARD, useExisting: auth_guard_service_1.AuthGuard },
        ],
        imports: [
            users_module_1.UsersModule,
            jwt_1.JwtModule.registerAsync({
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    secret: configService.getOrThrow('JWT_ACCESS_SECRET'),
                    signOptions: {
                        expiresIn: configService.getOrThrow('JWT_ACCESS_EXPIRES_IN'),
                    },
                }),
            }),
            refresh_token_module_1.RefreshTokenModule,
        ],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map