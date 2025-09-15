import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Product {
  @PrimaryColumn('char', { length: 36 })
  id: string;

  @Column({ length: 255 })
  nome: string;

  @Column({ type: 'text' })
  descricao: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  preco: string;

  @Column({ name: 'url_imagem', length: 500 })
  url_imagem: string;

  @Column({ name: 'quantidade_em_stock', type: 'int' })
  quantidade_em_stock: number;

  @Column({ length: 100 })
  marca: string;

  @Column({ length: 100 })
  categoria: string;

  @Column({ type: 'decimal', precision: 2, scale: 1, default: 0 })
  avaliacao: number; // média de 0.0 a 5.0
}
