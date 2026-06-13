import { CreateProductDto } from './dto/create-product.dto';
import { FindProductsQueryDto } from './dto/find-products-query.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    findAll(query: FindProductsQueryDto): ReturnType<ProductsService['findAll']>;
    findOne(id: string): ReturnType<ProductsService['findById']>;
    create(dto: CreateProductDto, storeId: string): ReturnType<ProductsService['create']>;
    update(id: string, dto: UpdateProductDto): ReturnType<ProductsService['update']>;
    remove(id: string): Promise<null>;
}
