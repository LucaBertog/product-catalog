import { IsInt, IsOptional, IsIn, IsUUID, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class QueryProductsDto {
  @IsOptional() @Transform(({ value }) => Number(value)) @IsInt() page = 1;
  @IsOptional() @Transform(({ value }) => Number(value)) @IsInt() limit = 10;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  // formato: "preco,asc" | "preco,desc" | "nome,asc" ...
  sort?: string;
}

export class ParamIdDto {
  @IsUUID() id: string;
}
