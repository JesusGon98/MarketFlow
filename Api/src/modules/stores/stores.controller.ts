import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { Store } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateStoreDto } from './dto/update-store.dto';
import { StoresService } from './stores.service';

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Get(':id')
  public findOne(@Param('id') id: string): Promise<Store> {
    return this.storesService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  public update(@Param('id') id: string, @Body() dto: UpdateStoreDto): Promise<Store> {
    return this.storesService.update(id, dto);
  }
}
