import { Prisma } from '@prisma/client';
import { PaginatedResult } from '../../common/interfaces/paginated-result.interface';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductsQueryDto } from './dto/find-products-query.dto';
import { UpdateProductDto } from './dto/update-product.dto';
declare const productInclude: {
    category: true;
};
type ProductWithCategory = Prisma.ProductGetPayload<{
    include: typeof productInclude;
}>;
type SerializedProduct = Omit<ProductWithCategory, 'price'> & {
    price: number;
};
export declare class ProductsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(params: FindProductsQueryDto): Promise<PaginatedResult<SerializedProduct>>;
    findById(id: string): Promise<SerializedProduct>;
    create(dto: CreateProductDto, storeId: string): Promise<SerializedProduct>;
    update(id: string, dto: UpdateProductDto): Promise<SerializedProduct>;
    remove(id: string): Promise<void>;
    private serialize;
}
export {};
