# Catálogo de Produtos Simples

Este projeto é uma aplicação **Full Stack** desenvolvida como exercício e teste técnico, com foco em boas práticas de frontend, backend, banco de dados e containerização.

---

## 🚀 Tecnologias Utilizadas

### Frontend
- React + Vite
- TypeScript
- React Router
- React Icons
- @smastrom/react-rating (componente de estrelas)

### Backend
- Node.js
- NestJS
- TypeORM
- MySQL

### Infraestrutura
- Docker & Docker Compose
- Nginx (reverse proxy)
- Scripts de seed para popular o banco

---

## 📦 Estrutura do Projeto

```
product-catalog/
├── backend/        # API REST (NestJS + TypeORM)
├── frontend/       # SPA React
├── infra/          # Docker Compose, Nginx e DB
└── README.txt
```

---

## 🗄️ Banco de Dados

**Tabela Product**
- `id` (UUID, PK)
- `nome` (string)
- `descricao` (text)
- `preco` (decimal)
- `url_imagem` (string)
- `quantidade_em_stock` (int)
- `marca` (string)
- `categoria` (string)
- `avaliacao` (decimal 0-5)

Scripts de **seed** estão incluídos para criar produtos de exemplo (fones, teclados, monitores etc.).

---

## 🔌 Endpoints da API

Base URL: `http://localhost:3000/api`

- `GET /products?page=1&limit=12&sort=nome,asc`
  - Lista paginada de produtos
  - Suporta ordenação por `nome` ou `preco`
- `GET /products?search=fone`
  - Filtra por termo no nome
- `GET /products/:id`
  - Detalhes de um produto específico

Respostas em JSON.

---

## 🎨 Funcionalidades do Frontend

- **Lista de produtos** em cards, com imagem, nome, preço e estrelas
- **Busca dinâmica** por nome
- **Ordenação** por nome ou preço
- **Página de detalhes** estilo e-commerce (imagem grande, avaliação em estrelas, descrição, marca, categoria, estoque, botões de ação)
- **Rodapé estilizado** com links para WhatsApp, Instagram e Bio.link

---

## 🐳 Rodando com Docker

Pré-requisitos:
- Docker
- Docker Compose

### Subir o ambiente
```bash
cd infra
docker compose up -d --build
```

Serviços:
- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:3000/api/products](http://localhost:3000/api/products)
- MySQL: `localhost:3306` (user: root / pass: root / db: catalog)

### Logs
```bash
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f db
```

### Resetar produtos e repopular
```bash
docker compose exec -T db mysql -uroot -proot -e "USE catalog; TRUNCATE TABLE product;"
docker compose run --rm backend node dist/seeds/seed.js
```

---

## 📖 Decisões de Design

- Uso de **React + Vite** para velocidade no desenvolvimento
- **NestJS** pela estrutura modular clara
- **TypeORM** pela integração simples com MySQL
- **Docker Compose** para subir frontend, backend e DB em conjunto
- Estilo **minimalista e profissional**, inspirado em e-commerces modernos

---

## 📝 Autor

Desenvolvido por **Lucas Bertoli** para Case.  
Links no rodapé do app:
- WhatsApp
- Instagram
- Bio.link
