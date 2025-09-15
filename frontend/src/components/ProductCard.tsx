import type { Product } from '../api/products';
import { Link } from 'react-router-dom';

export default function ProductCard({ p }:{ p:Product }) {
  return (
    <Link to={`/products/${p.id}`} className="card" aria-label={p.nome}>
      <img src={p.url_imagem} alt={p.nome} />
      <h3>{p.nome}</h3>
      <p>R$ {p.preco}</p>
    </Link>
  );
}
