import { Store } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateStoreDto } from './dto/update-store.dto';
export declare class StoresService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findById(id: string): Promise<Store>;
    update(id: string, dto: UpdateStoreDto): Promise<Store>;
}
