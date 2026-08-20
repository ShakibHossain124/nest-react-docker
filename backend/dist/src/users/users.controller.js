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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const role_check_guard_1 = require("../common/guards/role-check.guard");
const logger_interceptor_1 = require("../common/interceptors/logger.interceptor");
const positive_int_pipe_1 = require("../common/pipes/positive-int.pipe");
const enums_1 = require("../generated/prisma/enums");
const update_user_dto_1 = require("./dto/update-user.dto");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const update_role_dto_1 = require("./dto/update-role.dto");
const get_users_query_dto_1 = require("./dto/get-users-query.dto");
let UsersController = class UsersController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    findAll(query) {
        return this.usersService.findAll(query);
    }
    updateSelf(req, body) {
        return this.usersService.updateSelf(req.user.sub, body);
    }
    deleteSelf(id) {
        return this.usersService.deleteSelf(id);
    }
    findOne(id) {
        return this.usersService.findOne(id);
    }
    update(id, updateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }
    updateRole(id, role) {
        return this.usersService.updateRole(id, role);
    }
    delete(id) {
        return this.usersService.delete(id);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.Get)('/users'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_users_query_dto_1.GetUsersQueryDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, roles_decorator_1.Roles)(enums_1.UserRole['USER']),
    (0, common_1.Patch)('/update/self'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateSelf", null);
__decorate([
    (0, roles_decorator_1.Roles)(enums_1.UserRole['USER']),
    (0, common_1.Delete)('/delete/self'),
    __param(0, (0, current_user_decorator_1.CurrentUser)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "deleteSelf", null);
__decorate([
    (0, roles_decorator_1.Roles)(enums_1.UserRole['ADMIN']),
    (0, common_1.Get)('/user/:id'),
    __param(0, (0, common_1.Param)('id', positive_int_pipe_1.PositiveIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, roles_decorator_1.Roles)(enums_1.UserRole['ADMIN']),
    (0, common_1.Patch)('/user/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.Roles)(enums_1.UserRole['ADMIN']),
    (0, common_1.Patch)('/userRole/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_role_dto_1.UpdateRoleDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateRole", null);
__decorate([
    (0, roles_decorator_1.Roles)(enums_1.UserRole['ADMIN']),
    (0, common_1.Delete)('/user/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "delete", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.UseInterceptors)(logger_interceptor_1.LoggerInterceptor),
    (0, common_1.UseGuards)(role_check_guard_1.RoleCheck),
    (0, common_1.Controller)('/api'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map