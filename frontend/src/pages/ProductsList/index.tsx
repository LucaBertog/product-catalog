import { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchProducts } from '../../api/products';
import type { Product } from '../../api/products';
import SortSelect from '../../components/SortSelect';
import Pagination from '../../components/Pagination';
import ProductCard from '../../components/ProductCard';
import './styles.css';
import { useSearchParams } from 'react-router-dom';

export default function ProductsList() {
  const [items, setItems] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [sort, setSort] = useState('nome,asc');
  const [params] = useSearchParams();

  // le o termo da querystring (?q=...)
  const search = useMemo(() => params.get('q') ?? '', [params]);

  const load = useCallback(async () => {
    const data = await fetchProducts({ page, limit, sort, search });
    setItems(data.items);
    setTotal(data.total);
  }, [page, limit, sort, search]);

  // sempre que mudar search ou sort, volta pra página 1
  useEffect(() => {
    setPage(1);
  }, [search, sort]);

  // carrega a cada mudança relevante
  useEffect(() => {
    load();
  }, [load]);

  return (
    <section>
      <div className="controls">
        <SortSelect value={sort} onChange={(v) => setSort(v)} className="select" />
      </div>

      <div className="grid">
        {items.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>

      <div style={{ marginTop: 16 }}>
        <Pagination page={page} limit={limit} total={total} onChange={setPage} />
      </div>
    </section>
  );
}
