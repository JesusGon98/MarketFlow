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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const productInclude = { category: true };
let ProductsService = class ProductsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(params) {
        const page = params.page ?? 1;
        const limit = params.limit ?? 10;
        const where = {
            ...(params.categoryId ? { categoryId: params.categoryId } : {}),
            ...(params.search ? { name: { contains: params.search, mode: 'insensitive' } } : {}),
        };
        const [items, total] = await Promise.all([
            this.prisma.product.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: productInclude,
            }),
            this.prisma.product.count({ where }),
        ]);
        return {
            items: items.map((item) => this.serialize(item)),
            total,
            page,
            limit,
            pages: Math.ceil(total / limit) || 1,
        };
    }
    async findById(id) {
        const product = await this.prisma.product.findUnique({
            where: { id },
            include: productInclude,
        });
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        return this.serialize(product);
    }
    async create(dto, storeId) {
        const product = await this.prisma.product.create({ data: { ...dto, storeId }, include: productInclude });
        return this.serialize(product);
    }
    async update(id, dto) {
        await this.findById(id);
        const product = await this.prisma.product.update({ where: { id }, data: dto, include: productInclude });
        return this.serialize(product);
    }
    async remove(id) {
        await this.findById(id);
        await this.prisma.product.delete({ where: { id } });
    }
    serialize(product) {
        return { ...product, price: Number(product.price) };
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsService);
//# sourceMappingURL=products.service.js.map