import { Store } from '@prisma/client';
import { UpdateStoreDto } from './dto/update-store.dto';
import { StoresService } from './stores.service';
export declare class StoresController {
    private readonly storesService;
    constructor(storesService: StoresService);
    findOne(id: string): Promise<Store>;
    update(id: string, dto: UpdateStoreDto): Promise<Store>;
}
