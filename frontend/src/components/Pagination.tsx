export default function Pagination({ page, limit, total, onChange }:{
  page:number; limit:number; total:number; onChange:(p:number)=>void
}) {
  const pages = Math.max(1, Math.ceil(total / limit));
  return (
    <div style={{ display:'flex', gap:8, alignItems:'center' }}>
      <button disabled={page<=1} onClick={()=>onChange(page-1)}>Anterior</button>
      <span>Página {page} de {pages}</span>
      <button disabled={page>=pages} onClick={()=>onChange(page+1)}>Próxima</button>
    </div>
  );
}
