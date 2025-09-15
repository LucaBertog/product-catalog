import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { QueryProductsDto, ParamIdDto } from './dto/query-products.dto';

@Controller('api/products')
export class ProductsController {
  constructor(private service: ProductsService) {}

  @Get()
  list(@Query() q: QueryProductsDto) {
    // suporta: /api/products?page=1&limit=10&sort=preco,asc&search=fone
    return this.service.findAll(q);
  }

  @Get(':id')
  details(@Param() params: ParamIdDto) {
    return this.service.findOne(params.id);
  }
}
