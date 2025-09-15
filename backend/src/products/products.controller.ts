import { Controller, Get, Param, Query, NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { QueryProductsDto } from './dto/query-products.dto';
import { ParamIdDto } from '../common/dto/param-id.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  @Get()
  async list(@Query() q: QueryProductsDto) {
    return this.service.list(q); // service trata paginação/ordenar/busca
  }

  @Get(':id')
  async byId(@Param() { id }: ParamIdDto) {
    const p = await this.service.byId(id);
    if (!p) throw new NotFoundException('Produto não encontrado');
    return p;
  }
}
