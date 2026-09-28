# HeroVault

Tienda de figuras coleccionables: **Medusa v2** (API) + **Next.js** (storefront) + **PostgreSQL en Supabase**.

Repositorio: https://github.com/TheRealLemonMan/herovault-store

El storefront **no** usa `@supabase/supabase-js`. Solo habla con Medusa en el puerto `9000`.

```
Navegador → Next.js :8000 → Medusa :9000 → Supabase Session Pooler :5432
```

Los archivos `.env` **no se copian solos**. Hay que crearlos desde `.env.example` (paso 3). Esas plantillas ya traen la **base de Supabase poblada** de este proyecto para que, al arrancar, se vea el mismo catálogo.

## Cómo se ve la página en tu pantalla (ruta para evaluar)

No hace falta crear otro Supabase ni correr seed. El código + las plantillas apuntan a la base donde ya están las 37 figuras, `/ec` y USD.

1. Clona, instala Node 22 + pnpm, copia los `.env.example` (pasos 0, 1 y 3).
2. `pnpm install` en la raíz.
3. Terminal 1: `cd apps/backend` → `pnpm dev` (puerto **9000**).
4. Terminal 2: `cd apps/storefront` → `pnpm dev` (puerto **8000**).
5. Abre el navegador en **http://localhost:8000** (redirige a `/ec`).

Ahí se ve Home, catálogo, fichas y checkout. Deja las dos terminales abiertas.

**No ejecutes** `initial-data-seed.ts` sobre esta base compartida (duplicaría datos). El seed solo sirve si montas un Supabase vacío (paso 2, opcional).

Esta `DATABASE_URL` es para evaluación del curso. El repositorio debería ser **privado**. Después de la nota, conviene cambiar la contraseña de Supabase.

---

## 0. Lo que vas a instalar (una sola vez en tu PC)

| Herramienta | Versión | Para qué |
|-------------|---------|----------|
| Git | cualquiera reciente | clonar |
| Node.js | **22** (también vale 20.19+) | runtime |
| pnpm | **10.11.1** (vía Corepack) | instalar dependencias |
| Cuenta [Supabase](https://supabase.com) | free | solo si montas una base **vacía** (paso 2). Para evaluar, usa la `DATABASE_URL` de `.env.example` |

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

## 2. (Opcional) Crear tu propio Supabase vacío

Solo si quieres una base **tuya**, no la de demostración. Para ver el proyecto tal cual está entregado, **salta este paso**.

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

### 3.1 `apps/backend/.env`

La plantilla **ya incluye** la `DATABASE_URL` de Supabase con el catálogo cargado. Si seguiste el `cp` / `Copy-Item`, no hace falta pegar nada más.

Confirma que **no** hay ninguna línea `REDIS_URL`.

### 3.2 `apps/storefront/.env.local`

La plantilla **ya incluye** la Publishable API Key (`pk_…`) que corresponde a esa misma base. Déjala así, con `NEXT_PUBLIC_DEFAULT_REGION=ec`.

---

## 4. Instalar dependencias

En la **raíz** `herovault-store`:

```bash
pnpm install
```

Esto instala backend y storefront. Tarda varios minutos la primera vez.

---

## 5–7. Solo si usaste un Supabase vacío (paso 2)

Si copiaste `.env.example` y usas la base de demostración, **salta a 8**. No migres ni siembres encima.

Si montaste una base vacía:

```bash
cd apps/backend
npx medusa db:migrate
npx medusa user -e admin@herovault.test -p supersecret
npx medusa exec ./src/migration-scripts/initial-data-seed.ts
npx medusa exec ./src/scripts/seed-collectibles.ts
```

Luego copia la `pk_` nueva de Admin → Settings → Publishable API Keys a `.env.local`.

`initial-data-seed.ts` **no** se corre dos veces sobre la misma base.

---

## 8. Arrancar backend y storefront

**Terminal 1:**

```bash
cd apps/backend
pnpm dev
```

Espera el puerto **9000**. Admin: [http://localhost:9000/app](http://localhost:9000/app) (si existe el usuario local: `admin@herovault.test` / `supersecret`).

**Terminal 2:**

```bash
cd apps/storefront
pnpm dev
```

Puerto **8000**. Abre [http://localhost:8000](http://localhost:8000) → debe ir a **`/ec`**.

| URL | Qué es |
|-----|--------|
| http://localhost:8000/ec | Home (Ecuador, USD) |
| http://localhost:8000/ec/store | Catálogo |
| http://localhost:8000/dk | Dinamarca (no es el default) |
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
3. Copiar .env.example → .env y .env.local  (ya traen Supabase + pk_)
4. pnpm install          (raíz)
5. cd apps/backend && pnpm dev     (puerto 9000)
6. cd apps/storefront && pnpm dev  (puerto 8000)
7. Abrir http://localhost:8000
```

---

## Errores típicos (por eso a veces “no vale” al clonar)

| Síntoma | Causa | Qué hacer |
|---------|--------|-----------|
| `DATABASE_URL` missing / ECONNREFUSED Postgres | No creaste `.env` | Paso 3 |
| `SELF_SIGNED_CERT_IN_CHAIN` | `sslmode=require` en Node | Usa `?sslmode=no-verify` |
| `Tenant or user not found` | URI de Transaction pooler o user `postgres` | Session pooler, user `postgres.REF`, puerto 5432 |
| `No sales channel found. Run the initial seed first.` | Solo corriste `seed-collectibles` | Corre `initial-data-seed.ts` en base vacía |
| Catálogo vacío / error de regiones | No copiaste `.env.local` o cambiaste la `pk_` | Vuelve a copiar `apps/storefront/.env.example` |
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
