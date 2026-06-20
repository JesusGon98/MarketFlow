import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from '@prisma/client';
import { PaginatedResult } from '../../common/interfaces/paginated-result.interface';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

export interface FindAllCategoriesParams {
  page?: number;
  limit?: number;
  search?: string;
}

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  public async findAll(params: FindAllCategoriesParams): Promise<PaginatedResult<Category>> {
    const page = params.page ?? 1;
    const limit = params.limit ?? 10;

    const where = {
      ...(params.search ? { name: { contains: params.search, mode: 'insensitive' as const } } : {}),
    };

    const [items, total] = await Promise.all([
      this.prisma.category.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { name: 'asc' },
      }),
      this.prisma.category.count({ where }),
    ]);

    return { items, total, page, limit, pages: Math.ceil(total / limit) || 1 };
  }

  public async findById(id: string): Promise<Category> {
    const category = await this.prisma.category.findUnique({ where: { id } });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  public create(dto: CreateCategoryDto, storeId: string): Promise<Category> {
    return this.prisma.category.create({ data: { ...dto, storeId } });
  }

  public async update(id: string, dto: UpdateCategoryDto): Promise<Category> {
    await this.findById(id);

    return this.prisma.category.update({ where: { id }, data: dto });
  }

  public async remove(id: string): Promise<void> {
    await this.findById(id);
    await this.prisma.category.delete({ where: { id } });
  }
}
