import { Injectable, NotFoundException } from '@nestjs/common';
import { Banner } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';

@Injectable()
export class BannersService {
  constructor(private readonly prisma: PrismaService) {}

  public findAll(): Promise<Banner[]> {
    return this.prisma.banner.findMany({
      orderBy: { displayOrder: 'asc' },
    });
  }

  public async findById(id: string): Promise<Banner> {
    const banner = await this.prisma.banner.findUnique({ where: { id } });

    if (!banner) {
      throw new NotFoundException('Banner not found');
    }

    return banner;
  }

  public create(dto: CreateBannerDto, storeId: string): Promise<Banner> {
    return this.prisma.banner.create({ data: { ...dto, storeId } });
  }

  public async update(id: string, dto: UpdateBannerDto): Promise<Banner> {
    await this.findById(id);

    return this.prisma.banner.update({ where: { id }, data: dto });
  }

  public async remove(id: string): Promise<void> {
    await this.findById(id);
    await this.prisma.banner.delete({ where: { id } });
  }
}
