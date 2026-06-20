import { Banner } from '@prisma/client';
import { BannersService } from './banners.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
export declare class BannersController {
    private readonly bannersService;
    constructor(bannersService: BannersService);
    findAll(): Promise<Banner[]>;
    findOne(id: string): Promise<Banner>;
    create(dto: CreateBannerDto, storeId: string): Promise<Banner>;
    update(id: string, dto: UpdateBannerDto): Promise<Banner>;
    remove(id: string): Promise<null>;
}
