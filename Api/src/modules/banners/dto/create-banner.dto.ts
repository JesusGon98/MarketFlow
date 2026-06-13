import { Type } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional, IsString, Min, MinLength } from 'class-validator';

export class CreateBannerDto {
  @IsString()
  @MinLength(2)
  title!: string;

  @IsString()
  imageUrl!: string;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  displayOrder!: number;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
