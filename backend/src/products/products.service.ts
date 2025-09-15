import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { Product } from './product.entity';
import { QueryProductsDto } from './dto/query-products.dto';

const ALLOWED_SORT_FIELDS = ['nome', 'preco'];

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private repo: Repository<Product>) {}

  async list(q: QueryProductsDto) {
    const [field = 'nome', direction = 'asc'] = (q.sort ?? 'nome,asc').split(',');
    const f = field.trim();
    const d = (direction || 'asc').toLowerCase();

    if (!ALLOWED_SORT_FIELDS.includes(f) || !['asc','desc'].includes(d)) {
      throw new BadRequestException('Parâmetro sort inválido. Ex: sort=preco,asc');
    }

    const where: FindOptionsWhere<Product> = {};
    if (q.search) where.nome = ILike(`%${q.search}%`);
    if (q.marca) where.marca = ILike(`%${q.marca}%`);
    if (q.categoria) where.categoria = ILike(`%${q.categoria}%`);

    const page = q.page ?? 1;
    const limit = q.limit ?? 10;

    const [items, total] = await this.repo.findAndCount({
      where,
      order: { [f]: d.toUpperCase() as 'ASC' | 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return { items, total, page, limit };
  }

  byId(id: string) {
    return this.repo.findOne({ where: { id } });
  }
}
