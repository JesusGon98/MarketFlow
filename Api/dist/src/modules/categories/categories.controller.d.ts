import { Category } from '@prisma/client';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { PaginatedResult } from '../../common/interfaces/paginated-result.interface';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    findAll(query: PaginationQueryDto): Promise<PaginatedResult<Category>>;
    findOne(id: string): Promise<Category>;
    create(dto: CreateCategoryDto, storeId: string): Promise<Category>;
    update(id: string, dto: UpdateCategoryDto): Promise<Category>;
    remove(id: string): Promise<null>;
}
