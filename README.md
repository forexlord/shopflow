# ShopFlow

ShopFlow is a full-stack e-commerce application built as an npm workspaces monorepo. The React frontend provides product browsing, authentication, a per-user shopping cart, and a checkout flow; the Express API manages products, users, and JWT-protected admin operations backed by MongoDB.

**Production deployment** (S3 + EC2 + GitHub Actions) is documented in [DEPLOYMENT.md](./DEPLOYMENT.md).

## Features

- **Product catalog** — Search, category filters, price range, in-stock toggle, sort, grid/list views, and pagination
- **Product detail** — Image gallery, breadcrumbs, quantity stepper, and add-to-cart
- **Authentication** — Email/password login with JWT, session persistence, and protected routes
- **Shopping cart** — Per-user cart synced to the server (cross-browser), quantity controls, and header badge
- **Checkout** — Order summary with test purchase flow (spinner → success → cart cleared + toast)
- **Design system** — Shared tokens, atoms, and molecules used across all pages
- **Toast notifications** — Success and error feedback (API errors surface automatically)
- **Admin product management** — Create, edit, and delete products (admin account only)
- **Seed data** — 18 sample products and 2 demo users

## Tech Stack

| Layer        | Technology                               |
| ------------ | ---------------------------------------- |
| Frontend     | React 19, TypeScript, Vite, React Router |
| Styling      | CSS Modules + design tokens              |
| Backend      | Express 5, TypeScript, ts-node-dev       |
| Database     | MongoDB via Mongoose                     |
| Auth         | JWT (`jsonwebtoken`) + bcryptjs          |
| Monorepo     | npm workspaces + `concurrently`          |

## Architecture

```mermaid
flowchart TB
  subgraph client ["Client (port 3000)"]
    Pages["Pages: Products, Detail, Admin forms, Checkout, Login"]
    DS["Design System"]
    AuthCtx["AuthContext"]
    CartCtx["CartContext (synced via /api/cart)"]
    ToastCtx["ToastProvider"]
    Pages --> DS
    Pages --> AuthCtx
    Pages --> CartCtx
    Pages --> ToastCtx
  end

  subgraph server ["Server (port 5000)"]
    App["Express app"]
    AuthRoutes["/api/auth"]
    ProductRoutes["/api/products"]
    CartRoutes["/api/cart"]
    JWTMw["jwtMiddleware"]
    App --> AuthRoutes
    App --> ProductRoutes
    App --> CartRoutes
    ProductRoutes --> JWTMw
    CartRoutes --> JWTMw
  end

  subgraph db ["MongoDB"]
    Users["users"]
    Products["products"]
    Carts["carts"]
  end

  client -->|"HTTP (VITE_API_URL)"| server
  server --> db
```

### Request flow

1. **Public reads** — `GET /api/products`, `GET /api/products/:id`, and `GET /api/products/categories` require no authentication.
2. **Authentication** — `POST /api/auth/login` validates credentials with bcrypt and returns a JWT. The client stores the session in `localStorage` and sends `Authorization: Bearer <token>` on protected requests.
3. **Protected writes** — `POST`, `PATCH`, and `DELETE` on `/api/products` require a valid JWT **and** the `admin` role (`jwtMiddleware` → `adminMiddleware`). Shoppers receive `403 Forbidden` if they call these endpoints directly.
4. **Cart** — Each user's cart is stored in MongoDB and accessed via JWT-protected `/api/cart` endpoints. The client syncs changes on login and debounces updates after each cart mutation, so the same cart appears on any browser or device.
5. **Errors** — Failed API responses trigger an error toast in the top-right corner via the shared `apiClient`.

### Backend layout

The server follows a layered structure per domain:

```
routes → service → model (Mongoose)
```

- **Auth** — `auth.routes.ts` → `auth.service.ts` → `users.service.ts` / `User` model
- **Products** — `products.routes.ts` → `products.service.ts` → `Product` model
- **Cart** — `cart.routes.ts` → `cart.service.ts` → `Cart` model

Shared infrastructure lives in `config/db.ts` (MongoDB connection), `auth/jwt.middleware.ts`, and `auth/admin.middleware.ts`.

### Frontend layout

- **Routing** — `AppRouter` defines `/` (products), `/products/:productId`, `/products/new`, `/products/:id/edit` (admin), `/checkout`, and `/login`. Authenticated pages share a `Layout` shell (`AppHeader`, `AppFooter`). `AdminRoute` guards create/edit routes.
- **State** — `AppProvider` wraps `AuthProvider`, `CartProvider`, `ToastProvider`, and `ProductFiltersProvider`.
- **Features** — Domain logic lives under `features/` (`auth`, `products`, `cart`). Products include `ProductForm`, filters, grid/list views, and admin-only toolbar actions.
- **Design system** — Reusable UI in `design-system/` (tokens, 19 atoms, molecules including `ConfirmDialog` for delete confirmation).
- **API** — `api/client.ts` centralizes fetch, error handling, and toast notifications.

## Project Structure

```
shopflow/
├── DEPLOYMENT.md             # Production deploy guide (S3, EC2, CI/CD)
├── package.json              # Root workspace scripts
├── .github/workflows/
│   ├── frontend.yml          # Deploy client to S3 on push to main
│   └── backend.yml           # Deploy server to EC2 on push to main
├── client/
│   ├── src/
│   │   ├── api/              # apiClient, auth/products API, toast bridge
│   │   ├── components/       # AppHeader, AppFooter, Layout
│   │   ├── context/          # Auth, Cart, Toast providers
│   │   ├── design-system/    # Tokens, atoms, molecules
│   │   ├── features/
│   │   │   ├── auth/         # Login form
│   │   │   ├── cart/         # Checkout view, cart items, storage
│   │   │   └── products/     # Filters, grid, detail, ProductForm, isAdmin
│   │   ├── pages/            # Products, Detail, Create/Edit, Checkout, Login
│   │   └── routes/           # Router, ProtectedRoute, GuestRoute, AdminRoute
│   ├── vite.config.ts
│   └── .env.local            # VITE_API_URL
└── server/
    ├── src/
    │   ├── auth/             # Login, JWT middleware, DTOs
    │   ├── cart/             # Per-user cart API, model
    │   ├── products/         # CRUD, query parser, mapper, model
    │   ├── users/            # User model + lookup service
    │   ├── seed/             # Seed data and runners
    │   ├── config/           # Database connection
    │   ├── app.ts            # Express app factory
    │   ├── main.ts           # Entry point
    │   └── seed.ts           # Database seed entry point
    └── .env                  # PORT, MONGO_URI, JWT_SECRET
```

## Prerequisites

- **Node.js** 18+ (20 recommended)
- **npm** 9+
- **MongoDB** — local instance or MongoDB Atlas cluster

## Setup

### 1. Clone and install

```bash
git clone https://github.com/forexlord/shopflow
cd shopflow
npm install
```

This installs dependencies for both `client` and `server` workspaces from the root.

### 2. Configure environment variables

**Server** — create `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/shopflow
JWT_SECRET=your_secret_key_here
```

| Variable     | Description                         |
| ------------ | ----------------------------------- |
| `PORT`       | API listen port (default `5000`)    |
| `MONGO_URI`  | MongoDB connection string           |
| `JWT_SECRET` | Secret used to sign and verify JWTs |
| `CORS_ORIGIN` | Optional. Comma-separated allowed frontend URLs. Omit to allow all origins (needed for S3 → EC2). |

**Client** — create `client/.env.local`:

```env
VITE_API_URL=http://localhost:5000
```

| Variable       | Description                                     |
| -------------- | ----------------------------------------------- |
| `VITE_API_URL` | Base URL of the Express API (no trailing slash) |

### 3. Seed the database

```bash
npm run seed
```

This clears and re-inserts seed data:

- **18 products** — across categories like Electronics, Footwear, Apparel, and Home
- **2 demo users** with roles (`admin` / `shopper`) — see credentials below (there is no sign-up API)

> After re-seeding or upgrading to role-based auth, log out and log back in so the client receives a fresh JWT with `role`.

**Demo login credentials** (use these after seeding):

| Name | Email | Password | Role | Notes |
| ---- | ----- | -------- | ---- | ----- |
| Demo Shopper | `shopper@shopflow.com` | `password123` | `shopper` | Browse, cart, and checkout only |
| Admin User | `admin@shopflow.com` | `password123` | `admin` | Full access + create, edit, and delete products |

Each user has their **own cart**, stored on the server and **synced across browsers** when logged in as the same account.

### 4. Run in development

From the project root:

```bash
npm run dev
```

| Service          | URL                   |
| ---------------- | --------------------- |
| Client (Vite)    | http://localhost:3000 |
| Server (Express) | http://localhost:5000 |

Verify the API:

```bash
curl http://localhost:5000/health
# {"status":"ok"}
```

### 5. Sign in

Open http://localhost:3000 — unauthenticated users are redirected to `/login`. Use the [demo credentials](#3-seed-the-database) from step 3.

After login, browse products, add items to your cart, and visit `/checkout` to review the order summary. For production testing, see [DEPLOYMENT.md](./DEPLOYMENT.md#demo-accounts-no-sign-up-api).

### Testing admin product CRUD

> **Important:** Admin controls require the **`admin`** role (seed user `admin@shopflow.com`). The `shopper` account does not show create, edit, or delete buttons, and the API returns `403` for product writes.

1. Log in as `admin@shopflow.com` / `password123` — the header shows an **Admin** badge next to your avatar.
2. On the products page (`/`), click **Create product** in the toolbar (primary button, left of Filters).
3. Fill in the form (name, category, price, stock, description, optional image URL) and click **Save product** — you are redirected to the new product detail page.
4. On any product detail page, click **Edit product** next to Add to Cart — update fields and click **Update product**.
5. Scroll to the bottom of the detail page and click **Delete product** — confirm in the modal. The product is removed and you return to the catalog.

Direct URLs (admin only; non-admin users are redirected to `/`):

- Create: http://localhost:3000/products/new
- Edit: http://localhost:3000/products/:productId/edit

## Client Routes

| Path                  | Access    | Description                          |
| --------------------- | --------- | ------------------------------------ |
| `/login`              | Guest     | Sign-in form                         |
| `/`                   | Protected | Product catalog with filters         |
| `/products/:productId`| Protected | Product detail page                  |
| `/products/new`       | Admin     | Create product form                  |
| `/products/:id/edit`  | Admin     | Edit product form                    |
| `/checkout`           | Protected | Cart and order summary               |

### Admin product management

Only users with the **`admin`** role can manage the product catalog (seed: `admin@shopflow.com`):

| Action | Where |
| ------ | ----- |
| **Create** | “Create product” on the products page → `/products/new` |
| **Edit** | “Edit product” on a product detail page → `/products/:id/edit` |
| **Delete** | “Delete product” on a product detail page (confirmation modal) |

**Enforcement:**

| Layer | Behavior |
| ----- | -------- |
| **UI** | `AdminRoute` and `isAdmin(user)` hide admin controls unless `user.role === "admin"` |
| **API** | `adminMiddleware` on `POST` / `PATCH` / `DELETE` `/api/products` returns `403` for non-admin JWTs |

`shopper@shopflow.com` (`role: shopper`) has the same storefront experience but cannot create, edit, or delete products in the UI or via the API.

### Product form fields (create & edit)

| Field         | Control        | Required | Notes                                      |
| ------------- | -------------- | -------- | ------------------------------------------ |
| Product name  | Text input     | yes      |                                            |
| Category      | Select dropdown| no       | Loaded from API; defaults to seed categories |
| Price         | Number ($)     | yes      | Min 0                                      |
| Stock quantity| Number         | yes      | Integer, min 0                             |
| Description   | Textarea       | yes      |                                            |
| Image URL     | URL input      | no       | Direct link only (no file upload)          |

Successful create/update shows a success toast and navigates to the product detail page. Delete uses `ConfirmDialog` (not `window.confirm`).

## Scripts

Run from the **repository root**:

| Command                | Description                                        |
| ---------------------- | -------------------------------------------------- |
| `npm run dev`          | Start client and server in watch mode              |
| `npm run build:client` | Type-check and build the Vite app to `client/dist` |
| `npm run build:server` | Compile server TypeScript to `server/dist`         |
| `npm run start:server` | Run the compiled server (`node dist/main.js`)      |
| `npm run seed`         | Seed users and products                            |

Workspace-specific scripts are also available, e.g. `npm run dev --workspace=client`.

## API Reference

| Method   | Endpoint                    | Auth | Description              |
| -------- | --------------------------- | ---- | ------------------------ |
| `GET`    | `/health`                   | —    | Health check             |
| `POST`   | `/api/auth/login`           | —    | Login, returns JWT       |
| `GET`    | `/api/products`             | —    | List products (filtered) |
| `GET`    | `/api/products/categories`  | —    | Distinct categories      |
| `GET`    | `/api/products/:id`         | —    | Single product           |
| `POST`   | `/api/products`             | JWT + admin | Create product           |
| `PATCH`  | `/api/products/:id`         | JWT + admin | Update product           |
| `DELETE` | `/api/products/:id`         | JWT + admin | Delete product           |
| `GET`    | `/api/cart`                 | JWT  | Get current user's cart  |
| `PUT`    | `/api/cart`                 | JWT  | Replace cart items       |
| `DELETE` | `/api/cart`                 | JWT  | Clear cart               |

### Product list query parameters

| Parameter     | Type     | Description                                      |
| ------------- | -------- | ------------------------------------------------ |
| `search`      | string   | Text search on name and description              |
| `categories`  | string   | Comma-separated category names                   |
| `minPrice`    | number   | Minimum price                                    |
| `maxPrice`    | number   | Maximum price                                    |
| `inStockOnly` | boolean  | `"true"` to exclude out-of-stock items           |
| `sort`        | string   | `newest`, `price-asc`, `price-desc`, or `popular`|
| `page`        | number   | Page number (1-based)                            |
| `limit`       | number   | Items per page                                   |

### Product schema

| Field         | Type   | Required         |
| ------------- | ------ | ---------------- |
| `name`        | string | yes              |
| `description` | string | yes              |
| `price`       | number | yes              |
| `imageUrl`    | string | no               |
| `category`    | string | no               |
| `stock`       | number | no (default `0`) |
| `popularity`  | number | no (default `0`) |

### User schema

| Field      | Type   | Required     |
| ---------- | ------ | ------------ |
| `email`    | string | yes (unique) |
| `password` | string | yes (hashed) |
| `name`     | string | yes          |
| `role`     | string | yes (`admin` or `shopper`, default `shopper`) |

The JWT payload includes `userId` and `role`. Login response `user` object also includes `role` for client-side guards.

## Production & deployment

ShopFlow is deployed with:

- **Frontend** — Amazon S3 (static website hosting)
- **Backend** — Amazon EC2 with PM2
- **CI/CD** — GitHub Actions (`.github/workflows/frontend.yml` and `backend.yml`)

Pushes to `main` automatically deploy when `client/**` or `server/**` change.

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for:

- One-time EC2, S3, and IAM setup
- Environment variables and CORS
- GitHub Actions secrets
- Demo accounts (no sign-up endpoint) and per-user cross-browser cart
- Manual deploy commands
- Troubleshooting

Quick production build (local):

```bash
npm run build:server
VITE_API_URL=http://your-ec2-public-ip:5000 npm run build:client
```

> `VITE_*` variables are embedded at client build time. Rebuild the frontend if the API URL changes.

## Implementation Status

| Area                         | Status                                      |
| ---------------------------- | ------------------------------------------- |
| Monorepo + dev tooling       | Done                                        |
| Design system (19 atoms)     | Done                                        |
| MongoDB models + connection  | Done (users, products, carts)               |
| Auth (login, JWT, bcrypt)    | Done (no sign-up API)                       |
| Product read/write API       | Done (CRUD + filters + categories)          |
| Cart API (per-user, JWT)     | Done (GET/PUT/DELETE `/api/cart`)           |
| Database seed data           | Done (18 products, 2 users)                 |
| Product catalog UI           | Done (search, filters, sort, grid/list, pagination) |
| Product detail UI            | Done (gallery, quantity, add-to-cart)       |
| Per-user cart + checkout UI  | Done (server-synced cart, test purchase flow) |
| Toast notifications          | Done (API errors + success feedback)        |
| Admin product management UI  | **Done** — Create button on catalog; Edit/Delete on detail; shared `ProductForm`; `AdminRoute` + header Admin badge |
| CORS for S3 → EC2 deploy     | Done (`server/src/app.ts`, optional `CORS_ORIGIN`) |
| CI/CD (GitHub Actions)       | Done (frontend S3, backend EC2/PM2)         |
| Real payment / orders API    | Not started (checkout is simulated)         |
| Server-side admin role check | Done (`adminMiddleware` on product writes) |
| Automated tests / lint CI    | Not started                                 |
