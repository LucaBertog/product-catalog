import { DataSource } from 'typeorm';
import { Product } from '../products/product.entity';
import { v4 as uuid } from 'uuid';

const ds = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'db',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'root',
  database: process.env.DB_NAME || 'catalog',
  entities: [Product],
  synchronize: true,
});

async function run() {
  await ds.initialize();
  const repo = ds.getRepository(Product);
  const count = await repo.count();
  if (count === 0) {
    await repo.save([
      {
        id: uuid(),
        nome: 'Fone Sony WH-1000XM4',
        descricao: 'Fone de ouvido bluetooth over-ear com cancelamento de ruído ativo líder de mercado...',
        preco: '199.90',
        url_imagem: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?...',
        quantidade_em_stock: 15,
        marca: 'Sony',
        categoria: 'Áudio',
        avaliacao: 4.8,
      },
      {
        id: uuid(),
        nome: 'Teclado Mecânico Cherry MX',
        descricao: 'Teclado mecânico profissional com switches Cherry MX Blue...',
        preco: '349.00',
        url_imagem: 'https://images.unsplash.com/photo-1712396901531-605f06a423aa?...',
        quantidade_em_stock: 12,
        marca: 'Cherry',
        categoria: 'Periféricos',
        avaliacao: 4.6,
      },
      {
        id: uuid(),
        nome: 'Mouse Logitech G Pro X Superlight',
        descricao: 'Mouse gamer ultraleve com sensor HERO 25K de precisão máxima...',
        preco: '299.99',
        url_imagem: 'https://images.unsplash.com/photo-1605773527852-c546a8584ea3?...',
        quantidade_em_stock: 30,
        marca: 'Logitech',
        categoria: 'Periféricos',
        avaliacao: 4.9,
      },
      {
        id: uuid(),
        nome: 'Monitor Samsung Odyssey 27" Curved',
        descricao: 'Monitor curvo QHD com 165Hz, 1ms, FreeSync Premium e HDR10...',
        preco: '1899.00',
        url_imagem: 'https://images.unsplash.com/photo-1666771410003-8437c4781d49?...',
        quantidade_em_stock: 7,
        marca: 'Samsung',
        categoria: 'Monitores',
        avaliacao: 4.7,
      },
      {
        id: uuid(),
        nome: 'Webcam Logitech C922 Pro 1080p',
        descricao: 'Webcam Full HD com foco automático, correção de luz e microfones estéreo...',
        preco: '149.90',
        url_imagem: 'https://images.unsplash.com/photo-1623949556303-b0d17d198863?...',
        quantidade_em_stock: 25,
        marca: 'Logitech',
        categoria: 'Acessórios',
        avaliacao: 4.5,
      },
      ]);

  }
  await ds.destroy();
}
run();
