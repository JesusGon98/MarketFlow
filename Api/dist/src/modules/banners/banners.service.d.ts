import { Banner } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
export declare class BannersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<Banner[]>;
    findById(id: string): Promise<Banner>;
    create(dto: CreateBannerDto, storeId: string): Promise<Banner>;
    update(id: string, dto: UpdateBannerDto): Promise<Banner>;
    remove(id: string): Promise<void>;
}
