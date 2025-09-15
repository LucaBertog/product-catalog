import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private repo: Repository<Product>) {}

  async findAll({ page, limit, search, sort }: any) {
    const where = search ? { nome: ILike(`%${search}%`) } : {};
    let order: Record<string, 'ASC'|'DESC'> | undefined;
    if (sort) {
      const [field, dir] = sort.split(',');
      order = { [field]: (dir?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC') };
    }
    const [items, total] = await this.repo.findAndCount({
      where, order, skip: (page - 1) * limit, take: limit,
    });
    return { items, total, page, limit };
  }

  async findOne(id: string) {
    const prod = await this.repo.findOne({ where: { id }});
    if (!prod) throw new NotFoundException('Produto não encontrado');
    return prod;
  }
}
