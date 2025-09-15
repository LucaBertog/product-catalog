import { IsInt, IsIn, IsOptional, IsPositive, IsString, Min } from 'class-validator';

export class QueryProductsDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @IsPositive()
  limit?: number = 12;

  // formato: campo,direçao (ex: "preco,asc")
  @IsString()
  @IsOptional()
  sort?: string = 'nome,asc';

  @IsOptional()
  @IsString()
  search?: string;


  // (opcionais extras, se quiser filtrar)
  @IsOptional()
  @IsString()
  marca?: string;

  @IsOptional()
  @IsString()
  categoria?: string;
}
