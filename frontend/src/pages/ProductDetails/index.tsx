import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProduct } from '../../api/products';
import type { Product } from '../../api/products';

import { Rating, RoundedStar, type ItemStyles } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';

import './styles.css';

export default function ProductDetails(){
  const { id } = useParams<{id:string}>();
  const [p, setP] = useState<Product | null>(null);

  useEffect(() => {
    if (!id) return;
    fetchProduct(id).then(setP).catch(()=>setP(null));
  }, [id]);

  if (!p) return <p>Carregando...</p>;
  const inStock = p.quantidade_em_stock > 0;

  const starStyles: ItemStyles = {
    itemShapes: RoundedStar,
    activeFillColor: '#111',
    inactiveFillColor: 'transparent',
    itemStrokeWidth: 1.2,
    activeStrokeColor: '#111'
  };

  if (!p) return <p>Carregando...</p>;

  const rating = Math.max(0, Math.min(5, Number(p.avaliacao) || 0));  
  // força número [0..5]
  
  return (
    <>
      <p className="pd-breadcrumb">
        <Link to="/products" className="backlink">← Voltar</Link>
        {' '}· {p.categoria} · {p.marca}
      </p>

      <div className="pd-wrap">
        <figure className="pd-media">
          <img src={p.url_imagem} alt={p.nome} />
        </figure>

        <section>
          <h1 className="pd-title">{p.nome}</h1>
          <div className="pd-sub">por {p.marca} · {p.categoria}</div>

          {/*  Rating com frações e valor numérico */}
          <div className="pd-rating" aria-label={`Avaliação ${rating.toFixed(1)} de 5`}>
            <Rating
              value={rating}
              readOnly
              items={5}
              style={{ maxWidth: 150 }}
              itemStyles={starStyles}
            />
            <span style={{ fontWeight: 600 }}>{rating.toFixed(1)}</span>
          </div>

          <div className="pd-price">R$ {p.preco}</div>
          <div className="pd-stock">Estoque: {p.quantidade_em_stock}</div>

          <div className="pd-actions">
            <button className="btn" disabled={!inStock}>Adicionar ao carrinho</button>
            <button className="btn secondary">Favoritar</button>
          </div>

          <div className="pd-desc">
            <p>{p.descricao}</p>
            <dl className="specs">
              <dt>Marca</dt><dd>{p.marca}</dd>
              <dt>Categoria</dt><dd>{p.categoria}</dd>
              <dt>Avaliação</dt><dd>{Number(p.avaliacao ?? 0).toFixed(1)} / 5</dd>
              <dt>ID</dt><dd>{p.id.slice(0,8)}…</dd>
            </dl>
          </div>
        </section>
      </div>
    </>
  );
}
