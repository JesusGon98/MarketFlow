import { Category } from '@prisma/client';
import { PaginatedResult } from '../../common/interfaces/paginated-result.interface';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export interface FindAllCategoriesParams {
    storeId?: string;
    page?: number;
    limit?: number;
    search?: string;
}
export declare class CategoriesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(params: FindAllCategoriesParams): Promise<PaginatedResult<Category>>;
    findById(id: string): Promise<Category>;
    create(dto: CreateCategoryDto, storeId: string): Promise<Category>;
    update(id: string, dto: UpdateCategoryDto): Promise<Category>;
    remove(id: string): Promise<void>;
}
