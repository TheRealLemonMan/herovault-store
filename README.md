# HeroVault

Tienda de figuras coleccionables: **Medusa v2** (API) + **Next.js** (storefront) + **PostgreSQL en Supabase**.

Repositorio: https://github.com/TheRealLemonMan/herovault-store

El storefront **no** usa `@supabase/supabase-js`. Solo habla con Medusa en el puerto `9000`.

```
Navegador → Next.js :8000 → Medusa :9000 → Supabase Session Pooler :5432
```

Los archivos `.env` **no se suben a Git**. Después de clonar hay que crearlos. Si omites ese paso, el proyecto no arranca.

## Cómo se ve la página en tu pantalla

GitHub **no** abre la tienda. Al clonar solo bajas el código. Para **ver HeroVault igual que en la demo** (figuras, `/ec`, USD, carrito):

1. Sigue los pasos 0–8 de este README (Supabase propio + seed + dos terminales).
2. Con el backend en `:9000` y el storefront en `:8000`, abre el navegador en:

**http://localhost:8000**

Eso redirige a `/ec`. Ahí está el Home, el catálogo y el checkout.

El catálogo **sí es el de este proyecto**: las 37 figuras, imágenes y metadatos van en el repo y se cargan con el seed. No hace falta el computador del autor ni su base de datos. Cada persona que clona levanta **la misma tienda en su propia PC**.

Deja las dos terminales abiertas mientras navegas. Si las cierras, `localhost` deja de responder.

---

## 0. Lo que vas a instalar (una sola vez en tu PC)

| Herramienta | Versión | Para qué |
|-------------|---------|----------|
| Git | cualquiera reciente | clonar |
| Node.js | **22** (también vale 20.19+) | runtime |
| pnpm | **10.11.1** (vía Corepack) | instalar dependencias |
| Cuenta [Supabase](https://supabase.com) | free | base de datos Postgres |

No instales Redis. No uses `npm install` ni `yarn`.

### Node 22

- Windows / macOS: [nvm](https://github.com/coreybutler/nvm-windows) o el instalador de [nodejs.org](https://nodejs.org/) (LTS 22).
- Comprueba:

```bash
node -v
```

Debe mostrar `v22.x.x` (o `v20.19+`).

### pnpm (Corepack, incluido en Node)

```bash
corepack enable
corepack prepare pnpm@10.11.1 --activate
pnpm -v
```

---

## 1. Clonar el repositorio

```bash
git clone https://github.com/TheRealLemonMan/herovault-store.git
cd herovault-store
```

La raíz del repo **es** el monorepo (`apps/backend` y `apps/storefront`). Todos los `pnpm install` se hacen **aquí**, no dentro de cada app.

---

## 2. Crear un proyecto Supabase (base vacía)

1. Entra a [https://supabase.com/dashboard](https://supabase.com/dashboard) → **New project**.
2. Espera a que el proyecto esté **Healthy**.
3. **Connect** → elige **Session pooler** (no Transaction, no Direct).
4. Puerto **5432**.
5. Copia el URI. Debe verse así:

```text
postgresql://postgres.xxxxx:TU_PASSWORD@aws-0-xxxxx.pooler.supabase.com:5432/postgres
```

Reglas que suelen romper el clone:

- El usuario es `postgres.REFERENCIA`, no solo `postgres`.
- Puerto **5432**, nunca **6543**.
- Si la contraseña tiene `@`, `#`, `%`, etc., [codifícala en la URL](https://www.urlencoder.org/).
- Añade al final: `?sslmode=no-verify`  
  (`sslmode=require` en Node 22 suele fallar con `SELF_SIGNED_CERT_IN_CHAIN` contra el pooler).

URI final de ejemplo:

```text
postgresql://postgres.abcd1234:TU_PASSWORD@aws-0-us-west-2.pooler.supabase.com:5432/postgres?sslmode=no-verify
```

---

## 3. Crear los archivos de entorno

Los `.env` **no existen** al clonar. Cópialos desde las plantillas.

**Git Bash / macOS / Linux:**

```bash
cp apps/backend/.env.example apps/backend/.env
cp apps/storefront/.env.example apps/storefront/.env.local
```

**PowerShell (Windows):**

```powershell
Copy-Item apps\backend\.env.example apps\backend\.env
Copy-Item apps\storefront\.env.example apps\storefront\.env.local
```

### 3.1 Editar `apps/backend/.env`

Pega tu `DATABASE_URL` de Supabase (paso 2). Deja el resto igual (`JWT_SECRET=supersecret` sirve para evaluación local).

Confirma que **no** hay ninguna línea `REDIS_URL`.

### 3.2 Dejar `apps/storefront/.env.local` a medias

Por ahora deja:

- `NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000`
- `NEXT_PUBLIC_DEFAULT_REGION=ec`
- `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_...` **todavía placeholder**

La key real se copia **después** del seed (paso 6).

---

## 4. Instalar dependencias

En la **raíz** `herovault-store`:

```bash
pnpm install
```

Esto instala backend y storefront. Tarda varios minutos la primera vez.

---

## 5. Migrar la base e crear usuario admin

Abre una terminal **en `apps/backend`**:

```bash
cd apps/backend
npx medusa db:migrate
npx medusa user -e admin@herovault.test -p supersecret
```

- `db:migrate` crea las tablas Medusa (`product`, `region`, `cart`, `order`, etc.) en Supabase.
- El usuario admin es `admin@herovault.test` / `supersecret` (cámbialo si quieres).

Si `db:migrate` falla con SSL / certificado, revisa que `DATABASE_URL` termine en `?sslmode=no-verify` y que `apps/backend/medusa-config.ts` tenga `ssl: { rejectUnauthorized: false }` (ya viene en el repo).

---

## 6. Sembrar catálogo, región Ecuador (USD) y envíos

Sigue **dentro de `apps/backend`**. El backend **no** hace falta que esté corriendo: `medusa exec` arranca su propio proceso.

**Primera vez (base vacía) — obligatorio:**

```bash
npx medusa exec ./src/migration-scripts/initial-data-seed.ts
```

Eso crea canal de ventas, región USD, Ecuador (`ec`), opciones de envío (Standard / Express), categorías y las 37 figuras.

**Después, para alinear specs / Ecuador / catálogo (se puede repetir):**

```bash
npx medusa exec ./src/scripts/seed-collectibles.ts
```

No vuelvas a ejecutar `initial-data-seed.ts` sobre una base que ya tiene datos: fallará por duplicados.

---

## 7. Copiar la Publishable API Key al storefront

1. Arranca **solo el backend** (deja esta terminal abierta):

```bash
cd apps/backend
pnpm dev
```

Espera a ver que escucha el puerto **9000** (puede tardar 1–2 minutos).

2. Abre [http://localhost:9000/app](http://localhost:9000/app)
3. Entra con `admin@herovault.test` / `supersecret`
4. **Settings → Developer → Publishable API Keys** (o **API key**)
5. Copia la key que empieza por `pk_`
6. Pégala en `apps/storefront/.env.local`:

```env
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_la_key_real_aqui
NEXT_PUBLIC_DEFAULT_REGION=ec
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
```

Sin esta key el catálogo sale vacío o el middleware no puede leer regiones.

---

## 8. Arrancar el storefront (segunda terminal)

**Nueva** terminal, no cierres el backend:

```bash
cd apps/storefront
pnpm dev
```

Puerto **8000**.

Abre [http://localhost:8000](http://localhost:8000). Debe redirigir a **`/ec`**.

| URL | Qué es |
|-----|--------|
| http://localhost:8000/ec | Home (Ecuador, USD) |
| http://localhost:8000/ec/store | Catálogo |
| http://localhost:8000/dk | Dinamarca (sigue existiendo; no es el default) |
| http://localhost:9000 | API Medusa |
| http://localhost:9000/app | Admin |

---

## 9. Comprobar que funciona

- Home y catálogo muestran figuras (Marvel, DC, Anime, Star Wars, Video Games).
- Precios en **USD** (`$`).
- Una ficha (`/ec/products/...`) abre **Product Information** con material, origen, peso y dimensiones (no `-`).
- **Add to cart** → `/ec/cart` → checkout → dirección país **Ecuador** → Standard o Express → pago **manual** → orden creada.

---

## Orden rápido (resumen)

```text
1. git clone … && cd herovault-store
2. Node 22 + corepack/pnpm
3. Crear proyecto Supabase → Session pooler :5432 → DATABASE_URL
4. Copiar .env.example → .env y .env.local
5. pnpm install          (raíz)
6. cd apps/backend
   npx medusa db:migrate
   npx medusa user -e admin@herovault.test -p supersecret
   npx medusa exec ./src/migration-scripts/initial-data-seed.ts
   npx medusa exec ./src/scripts/seed-collectibles.ts
   pnpm dev              (puerto 9000)
7. Copiar pk_ … a apps/storefront/.env.local
8. cd apps/storefront && pnpm dev   (puerto 8000)
```

---

## Errores típicos (por eso a veces “no vale” al clonar)

| Síntoma | Causa | Qué hacer |
|---------|--------|-----------|
| `DATABASE_URL` missing / ECONNREFUSED Postgres | No creaste `.env` | Paso 3 |
| `SELF_SIGNED_CERT_IN_CHAIN` | `sslmode=require` en Node | Usa `?sslmode=no-verify` |
| `Tenant or user not found` | URI de Transaction pooler o user `postgres` | Session pooler, user `postgres.REF`, puerto 5432 |
| `No sales channel found. Run the initial seed first.` | Solo corriste `seed-collectibles` | Corre `initial-data-seed.ts` en base vacía |
| Catálogo vacío / error de regiones | `pk_` de ejemplo | Paso 7 |
| `/` redirige a `/dk` | Storefront arrancó **antes** de sembrar `ec`, o falta `NEXT_PUBLIC_DEFAULT_REGION=ec` | Siembra, pon `ec` en `.env.local`, **reinicia** Next |
| Checkout sin envío | No se sembró fulfillment | `initial-data-seed.ts` |
| `redisUrl not found` (warning amarillo) | Normal | No agregues `REDIS_URL` |
| Puerto 8000/9000 ocupado | Otro proceso | Ciérralo o reinicia el PC |
| `pnpm: command not found` | No activaste Corepack | Paso 0 |
| `npm install` en una app | Rompe el monorepo | Borra `node_modules`, usa `pnpm install` en la raíz |

En Windows usa **dos terminales**. Git Bash y PowerShell sirven; los `cd` con `/` o `\` ambos funcionan si estás en la carpeta correcta.

---

## Arquitectura (3 capas)

1. **Storefront** `apps/storefront` — Next.js, puerto 8000, región `/ec`, USD.
2. **Backend** `apps/backend` — Medusa v2, puerto 9000, Admin `/app`.
3. **Datos** — Postgres de Supabase (Session Pooler 5432). Medusa persiste productos, carritos y órdenes.

No hace falta pegar secretos de Supabase en el storefront.
