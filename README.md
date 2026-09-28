# HeroVault

Tienda de figuras coleccionables construida con **Medusa v2**, **Next.js** y **PostgreSQL en Supabase**. El storefront no se conecta a Supabase: solo consume la API de Medusa.

## Arquitectura (3 capas)

1. **Storefront (Next.js)** — `apps/storefront`, puerto `8000`. Catálogo, carrito y checkout. Prefijo de país `/ec` (Ecuador, USD).
2. **Backend (Medusa v2)** — `apps/backend`, puerto `9000`. Productos, regiones, carritos, pedidos y Admin (`/app`).
3. **Base de datos (Supabase Postgres)** — Session Pooler en el puerto `5432` con SSL (`sslmode=require`). Medusa ejecuta las migraciones y persiste `product`, `region`, `cart`, `order`, `line_item`, etc.

```
Navegador → Next.js :8000 → Medusa :9000 → Supabase Postgres :5432
```

## Requisitos previos

- Node.js 22 (o `^20.19.0 || >=22.12.0`)
- pnpm 10
- Proyecto Supabase con Session Pooler (host `*.pooler.supabase.com`, puerto **5432**)
- No se usa Redis en desarrollo; no definas `REDIS_URL`

## 1. Instalar dependencias

Desde la raíz del monorepo (`store/`):

```bash
pnpm install
```

Copia las plantillas de entorno (valores ficticios) y rellena secretos locales:

```bash
cp apps/backend/.env.example apps/backend/.env
cp apps/storefront/.env.example apps/storefront/.env.local
```

En `apps/backend/.env`, `DATABASE_URL` debe apuntar al Session Pooler de Supabase (`:5432`) e incluir `?sslmode=require`.

En `apps/storefront/.env.local`, pega la **Publishable API Key** de Medusa Admin (Settings → API key) y deja `NEXT_PUBLIC_DEFAULT_REGION=ec`.

## 2. Backend (puerto 9000)

```bash
cd apps/backend
pnpm dev
```

- API: `http://localhost:9000`
- Admin: `http://localhost:9000/app`

La primera vez Medusa aplica migraciones sobre Supabase. Luego siembra el catálogo:

```bash
npx medusa exec ./src/scripts/seed-collectibles.ts
```

Ese script actualiza figuras, fuerza USD, registra Ecuador (`ec`) y deja opciones de envío para el checkout.

## 3. Storefront (puerto 8000)

```bash
cd apps/storefront
pnpm dev
```

Abre `http://localhost:8000`. El middleware redirige `/` a `/ec`. `/dk` sigue disponible si se visita de forma explícita.

## Flujo de compra

Catálogo → Agregar al carrito → `/ec/cart` → `/ec/checkout` → dirección → envío (Standard/Express) → pago manual → orden persistida en Medusa/Supabase.
