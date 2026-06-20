import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';
import { PaginatedResult } from '../../common/interfaces/paginated-result.interface';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductsQueryDto } from './dto/find-products-query.dto';
import { UpdateProductDto } from './dto/update-product.dto';

const productInclude = { category: true } satisfies Prisma.ProductInclude;

type ProductWithCategory = Prisma.ProductGetPayload<{ include: typeof productInclude }>;
type SerializedProduct = Omit<ProductWithCategory, 'price'> & { price: number };

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  public async findAll(params: FindProductsQueryDto): Promise<PaginatedResult<SerializedProduct>> {
    const page = params.page ?? 1;
    const limit = params.limit ?? 10;

    const where = {
      ...(params.categoryId ? { categoryId: params.categoryId } : {}),
      ...(params.search ? { name: { contains: params.search, mode: 'insensitive' as const } } : {}),
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

  public async findById(id: string): Promise<SerializedProduct> {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: productInclude,
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return this.serialize(product);
  }

  public async create(dto: CreateProductDto, storeId: string): Promise<SerializedProduct> {
    const product = await this.prisma.product.create({ data: { ...dto, storeId }, include: productInclude });

    return this.serialize(product);
  }

  public async update(id: string, dto: UpdateProductDto): Promise<SerializedProduct> {
    await this.findById(id);

    const product = await this.prisma.product.update({ where: { id }, data: dto, include: productInclude });

    return this.serialize(product);
  }

  public async remove(id: string): Promise<void> {
    await this.findById(id);
    await this.prisma.product.delete({ where: { id } });
  }

  private serialize(product: ProductWithCategory): SerializedProduct {
    return { ...product, price: Number(product.price) };
  }
}
