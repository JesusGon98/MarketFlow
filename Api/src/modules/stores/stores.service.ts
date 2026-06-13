import { Injectable, NotFoundException } from '@nestjs/common';
import { Store } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateStoreDto } from './dto/update-store.dto';

@Injectable()
export class StoresService {
  constructor(private readonly prisma: PrismaService) {}

  public async findById(id: string): Promise<Store> {
    const store = await this.prisma.store.findUnique({ where: { id } });

    if (!store) {
      throw new NotFoundException('Store not found');
    }

    return store;
  }

  public async update(id: string, dto: UpdateStoreDto): Promise<Store> {
    await this.findById(id);

    return this.prisma.store.update({ where: { id }, data: dto });
  }
}
