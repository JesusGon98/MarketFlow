import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { StoreId } from '../../common/decorators/store-id.decorator';
import { PaginatedResult } from '../../common/interfaces/paginated-result.interface';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductsQueryDto } from './dto/find-products-query.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  public findAll(@Query() query: FindProductsQueryDto): ReturnType<ProductsService['findAll']> {
    return this.productsService.findAll(query);
  }

  @Get(':id')
  public findOne(@Param('id') id: string): ReturnType<ProductsService['findById']> {
    return this.productsService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  public create(@Body() dto: CreateProductDto, @StoreId() storeId: string): ReturnType<ProductsService['create']> {
    return this.productsService.create(dto, storeId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  public update(@Param('id') id: string, @Body() dto: UpdateProductDto): ReturnType<ProductsService['update']> {
    return this.productsService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  public async remove(@Param('id') id: string): Promise<null> {
    await this.productsService.remove(id);
    return null;
  }
}
