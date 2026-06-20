import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Banner } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { StoreId } from '../../common/decorators/store-id.decorator';
import { BannersService } from './banners.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';

@Controller('banners')
export class BannersController {
  constructor(private readonly bannersService: BannersService) {}

  @Get()
  public findAll(): Promise<Banner[]> {
    return this.bannersService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id') id: string): Promise<Banner> {
    return this.bannersService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  public create(@Body() dto: CreateBannerDto, @StoreId() storeId: string): Promise<Banner> {
    return this.bannersService.create(dto, storeId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  public update(@Param('id') id: string, @Body() dto: UpdateBannerDto): Promise<Banner> {
    return this.bannersService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  public async remove(@Param('id') id: string): Promise<null> {
    await this.bannersService.remove(id);
    return null;
  }
}
