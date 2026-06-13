import { IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';

export class FindProductsQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  categoryId?: string;
}
