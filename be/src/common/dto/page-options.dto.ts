import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

export const DEFAULT_ITEMS_PER_PAGE = 10;

export class PageOptionsDto {
  @IsOptional()
  @IsString()
  @IsIn(['id', 'name', 'description', 'type', 'priority'])
  readonly sortBy?: string = 'id';

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page?: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  readonly take?: number = DEFAULT_ITEMS_PER_PAGE;

  @IsOptional()
  readonly order?: Order = Order.ASC;

  get skip(): number {
    const page = (this.page ?? 1) - 1;
    const pageSize = this.take ?? DEFAULT_ITEMS_PER_PAGE;
    return page * pageSize;
  }

  @IsOptional()
  @Type(() => String)
  @IsString()
  readonly filter?: string;
}
