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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const config_1 = require("@nestjs/config");
const bcrypt_1 = __importDefault(require("bcrypt"));
let UsersService = class UsersService {
    prisma;
    configService;
    constructor(prisma, configService) {
        this.prisma = prisma;
        this.configService = configService;
    }
    async updateSelf(id, body) {
        if (body.password) {
            const password = body.password;
            const saltRounds = Number(this.configService.getOrThrow('BCRYPT_SALT_ROUND'));
            const hashedPassword = await bcrypt_1.default.hash(password, saltRounds);
            body.password = hashedPassword;
        }
        return this.prisma.user.update({
            where: { id },
            data: body,
        });
    }
    async deleteSelf(id) {
        return this.prisma.user.delete({ where: { id } });
    }
    async findAll(query) {
        const { limit, page, order = 'asc', sortBy = 'id', role, search } = query;
        let where = {};
        if (role)
            where.role = role;
        if (search)
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
            ];
        if ((page && !limit) || (!page && limit)) {
            throw new common_1.BadRequestException('page and limit must be provided together');
        }
        if (limit && page) {
            const skip = (page - 1) * limit;
            const [users, total] = await this.prisma.$transaction([
                this.prisma.user.findMany({
                    where,
                    skip: skip,
                    take: limit,
                    orderBy: [
                        {
                            [sortBy]: order,
                        },
                        {
                            id: 'asc',
                        },
                    ],
                }),
                this.prisma.user.count({ where }),
            ]);
            return {
                data: users,
                meta: {
                    page,
                    limit,
                    total,
                    totalPages: Math.ceil(total / limit),
                },
            };
        }
        return await this.prisma.user.findMany({
            where,
            orderBy: [
                {
                    [sortBy]: order,
                },
                {
                    id: 'asc',
                },
            ],
            select: {
                id: true,
                name: true,
                email: true,
                password: true,
                createdAt: true,
                updatedAt: true,
                _count: true,
                refreshTokens: {
                    select: {
                        hashedToken: true
                    }
                },
            }
        });
    }
    async create(createUserDto) {
        return await this.prisma.user.create({
            data: createUserDto,
        });
    }
    async findOne(id) {
        let user = await this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async update(id, updateUserDto) {
        await this.findOne(id);
        if (updateUserDto.password) {
            const password = updateUserDto.password;
            const saltRounds = Number(this.configService.getOrThrow('BCRYPT_SALT_ROUND'));
            const hashedPassword = await bcrypt_1.default.hash(password, saltRounds);
            updateUserDto.password = hashedPassword;
        }
        return this.prisma.user.update({
            where: { id: id },
            data: updateUserDto,
        });
    }
    async updateRole(id, dto) {
        return this.prisma.user.update({
            where: { id },
            data: { role: dto.role },
        });
    }
    async delete(id) {
        await this.findOne(id);
        return this.prisma.user.delete({ where: { id: id } });
    }
    async findByEmail(email) {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], UsersService);
//# sourceMappingURL=users.service.js.map