import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { Category } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { StoreId } from '../../common/decorators/store-id.decorator';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { PaginatedResult } from '../../common/interfaces/paginated-result.interface';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  public findAll(@Query() query: PaginationQueryDto): Promise<PaginatedResult<Category>> {
    return this.categoriesService.findAll(query);
  }

  @Get(':id')
  public findOne(@Param('id') id: string): Promise<Category> {
    return this.categoriesService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  public create(@Body() dto: CreateCategoryDto, @StoreId() storeId: string): Promise<Category> {
    return this.categoriesService.create(dto, storeId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  public update(@Param('id') id: string, @Body() dto: UpdateCategoryDto): Promise<Category> {
    return this.categoriesService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  public async remove(@Param('id') id: string): Promise<null> {
    await this.categoriesService.remove(id);
    return null;
  }
}
