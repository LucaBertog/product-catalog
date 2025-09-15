import SearchBar from "./SearchBar";

type TopbarProps = {
  onSearch: (term: string) => void;
};

export default function Topbar({ onSearch }: TopbarProps) {
  return (
    <header style={{
      borderBottom: "1px solid var(--border)",
      background: "var(--bg)",
      position: "sticky",
      top: 0,
      zIndex: 10
    }}>
      <div className="container" style={{
        display: "grid",
        gridTemplateColumns: "56px 1fr",
        alignItems: "center",
        gap: 16,
        paddingTop: 8,
        paddingBottom: 8
      }}>
        <a href="/products" style={{
          display: "inline-flex",
          width: 56, height: 56,
          border: "2px solid var(--border)",
          overflow: "hidden"
        }}>
          <img src="/logoDeB.png" alt="Logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </a>
        <div>
          <SearchBar onChange={onSearch} />
        </div>
      </div>
    </header>
  );
}
