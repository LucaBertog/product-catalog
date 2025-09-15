export default function SortSelect({ value, onChange, className }:{
  value: string; onChange:(v:string)=>void; className?: string;
}) {
  return (
    <select value={value} onChange={(e)=>onChange(e.target.value)} className={className}>
      <option value="nome,asc">Nome A→Z</option>
      <option value="nome,desc">Nome Z→A</option>
      <option value="preco,asc">Preço ↑</option>
      <option value="preco,desc">Preço ↓</option>
    </select>
  );
}