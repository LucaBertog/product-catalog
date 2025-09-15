import { useState, useEffect } from 'react';

export default function SearchBar({ onChange }: { onChange: (term: string) => void }) {
  const [value, setValue] = useState('');
  useEffect(() => {
    const t = setTimeout(() => onChange(value), 300);
    return () => clearTimeout(t);
  }, [value, onChange]);

  return (
    <input
      placeholder="Buscar produto..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
      style={{
        width: "100%",
        height: 44,
        padding: "0 14px",
        border: "1px solid var(--border)",
        outline: "none",
        background: "#fff",
        color: "var(--text)",
        fontSize: 16,
      }}
    />
  );
}
