import api from './client';

export type Product = {
  id: string;
  nome: string;
  descricao: string;
  preco: string;
  url_imagem: string;
  quantidade_em_stock: number;
  marca: string;
  categoria: string;
  avaliacao: number | string;
};


export type ProductListResponse = {
  items: Product[];
  total: number;
  page: number;
  limit: number;
};

export async function fetchProducts(
  { page = 1, limit = 12, sort = 'nome,asc', search = '' }:
  { page?: number; limit?: number; sort?: string; search?: string }
) 
{
  const res = await api.get<ProductListResponse>('/products', { params: { page, limit, sort, search }});
  return res.data;
}

export async function fetchProduct(id: string) {
  const res = await api.get<Product>(`/products/${id}`);
  return res.data;
}
