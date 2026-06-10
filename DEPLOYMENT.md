# ShopFlow Deployment Guide

This document covers production deployment for ShopFlow using:

- **Frontend** — static React build hosted on **Amazon S3** (website hosting)
- **Backend** — Express API on **Amazon EC2**, managed with **PM2**
- **Database** — **MongoDB** (local on EC2 or MongoDB Atlas)
- **CI/CD** — **GitHub Actions** workflows that deploy on push to `main`

For local development, see the [README](./README.md).

---

## Architecture

```mermaid
flowchart LR
  Browser["Browser"]
  S3["S3 static website\n(client/dist)"]
  EC2["EC2 + PM2\nExpress API :5000"]
  Mongo["MongoDB"]

  Browser --> S3
  Browser -->|"VITE_API_URL\n(cross-origin)"| EC2
  EC2 --> Mongo
```

| Component | Role |
| --------- | ---- |
| S3 bucket | Serves the built Vite app (`client/dist`) |
| EC2 instance | Runs the compiled Node API (`server/dist/main.js`) |
| GitHub Actions | Builds and deploys frontend/backend independently |
| `VITE_API_URL` | Baked into the client at **build time** — must point to your EC2 API |

---

## One-time infrastructure setup

### 1. EC2 instance

1. Launch an Ubuntu EC2 instance (Node.js 18+).
2. Open inbound security group rules:
   - **SSH (22)** — your IP (or GitHub Actions IP ranges if restricting)
   - **Custom TCP 5000** — `0.0.0.0/0` (or restrict to known clients)
3. SSH in and install dependencies:

```bash
sudo apt update
sudo apt install -y git nodejs npm
sudo npm install -g pm2
```

4. Clone the repo and configure the server:

```bash
git clone https://github.com/forexlord/shopflow.git ~/shopflow
cd ~/shopflow
npm install
```

5. Create `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/shopflow
JWT_SECRET=your_long_random_secret_here
# Optional — omit to allow all origins (recommended for initial S3 setup):
# CORS_ORIGIN=http://your-bucket.s3-website-us-east-1.amazonaws.com
```

6. Seed the database (first run only):

```bash
npm run seed
```

**Demo login credentials** (no sign-up API — accounts exist only after seeding):

| Name | Email | Password | Notes |
| ---- | ----- | -------- | ----- |
| Demo Shopper | `shopper@shopflow.com` | `password123` | Browse, cart, and checkout only |
| Admin User | `admin@shopflow.com` | `password123` | Full access + create, edit, and delete products |

Only the **admin** account can create, edit, or delete products. Each user has their **own cart**, synced **across browsers** when logged in as the same account.

7. Build and start with PM2:

```bash
npm run build:server
pm2 start server/dist/main.js --name shopflow-api
pm2 save
pm2 startup
```

8. Verify the API:

```bash
curl http://localhost:5000/health
# {"status":"ok"}
```

### 2. S3 bucket (frontend)

1. Create an S3 bucket (e.g. `shopflow-frontend`).
2. Enable **Static website hosting** (index document: `index.html`, error document: `index.html` for SPA routing).
3. Set bucket policy to allow public read on objects (or use CloudFront later).
4. Note the **website endpoint** URL, e.g.:

```
http://shopflow-frontend.s3-website-us-east-1.amazonaws.com
```

### 3. IAM user (for GitHub Actions → S3)

Create an IAM user with programmatic access and a policy limited to your bucket, e.g.:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:GetObject", "s3:DeleteObject", "s3:ListBucket"],
      "Resource": [
        "arn:aws:s3:::YOUR_BUCKET_NAME",
        "arn:aws:s3:::YOUR_BUCKET_NAME/*"
      ]
    }
  ]
}
```

Save the **Access Key ID** and **Secret Access Key** for GitHub secrets.

---

## Environment variables

### Server (`server/.env` on EC2)

| Variable | Required | Description |
| -------- | -------- | ----------- |
| `PORT` | Yes | API port (default `5000`) |
| `MONGO_URI` | Yes | MongoDB connection string |
| `JWT_SECRET` | Yes | Secret for signing JWTs |
| `CORS_ORIGIN` | No | Comma-separated frontend URLs. **Omit** to allow all origins (simplest for S3 → EC2). |

### Client (build-time only)

| Variable | Required | Description |
| -------- | -------- | ----------- |
| `VITE_API_URL` | Yes | Public EC2 API URL, e.g. `http://EC2_PUBLIC_IP:5000` (no trailing slash) |

> `VITE_*` variables are embedded during `npm run build`. Rebuild and redeploy the client whenever the API URL changes.

---

## CORS

Browsers block cross-origin requests from your S3 site to your EC2 API unless the backend allows it. `curl` and direct URL visits are **not** affected — only the React app in the browser.

ShopFlow configures CORS in `server/src/app.ts` using the [`cors`](https://www.npmjs.com/package/cors) package:

- **No `CORS_ORIGIN` set** → all origins allowed (good for getting S3 + EC2 working quickly).
- **`CORS_ORIGIN` set** → only listed origins allowed (recommended once your S3 URL is stable).

Example:

```env
CORS_ORIGIN=http://shopflow-frontend.s3-website-us-east-1.amazonaws.com
```

After changing `server/.env`, rebuild and restart:

```bash
npm run build:server
pm2 restart shopflow-api --update-env
```

---

## GitHub Actions (CI/CD)

Two workflows live in `.github/workflows/` and run **only on pushes to `main`** when relevant paths change.

| Workflow | File | Triggers on | Action |
| -------- | ---- | ----------- | ------ |
| Deploy Frontend to S3 | `frontend.yml` | `client/**` | Build with `VITE_API_URL`, sync `client/dist/` to S3 |
| Deploy Backend to EC2 | `backend.yml` | `server/**` | SSH to EC2, pull, install, build, PM2 restart |

### Required GitHub secrets

Go to **Repository → Settings → Secrets and variables → Actions** and add:

#### Frontend secrets

| Secret | Description | Example |
| ------ | ----------- | ------- |
| `VITE_API_URL` | EC2 API URL used at build time | `http://54.123.45.67:5000` |
| `AWS_ACCESS_KEY_ID` | IAM access key for S3 deploy | — |
| `AWS_SECRET_ACCESS_KEY` | IAM secret key | — |
| `S3_BUCKET_NAME` | Target bucket name | `shopflow-frontend` |

#### Backend secrets

| Secret | Description | Example |
| ------ | ----------- | ------- |
| `EC2_HOST` | EC2 public IP or DNS | `54.123.45.67` |
| `EC2_USERNAME` | SSH user | `ubuntu` |
| `EC2_SSH_KEY` | Full private key (PEM contents) | `-----BEGIN RSA PRIVATE KEY-----...` |

> The backend workflow uses SSH port **22**. Change `port` in `backend.yml` if your instance uses a custom port.

### What each workflow does

**Frontend (`frontend.yml`):**

1. Checkout code
2. `npm install` (root workspace)
3. `cd client && npm run build` with `VITE_API_URL` from secrets
4. `aws s3 sync client/dist/ s3://$S3_BUCKET_NAME --delete`

**Backend (`backend.yml`):**

1. SSH into EC2
2. `cd ~/shopflow && git pull origin main`
3. `npm install && npm run build:server`
4. `pm2 restart shopflow-api --update-env`

### Path filters

- Frontend deploys **only** when `client/**` or `frontend.yml` changes.
- Backend deploys **only** when `server/**` or `backend.yml` changes.
- Changes to both folders in one commit trigger **both** workflows.

---

## Manual deployment

Use these when you need to deploy without GitHub Actions or for debugging.

### Deploy backend manually (EC2)

```bash
cd ~/shopflow
git pull origin main
npm install
npm run build:server
pm2 restart shopflow-api --update-env
```

### Deploy frontend manually (from your machine)

```bash
cd shopflow
npm install

# Set API URL for this build
export VITE_API_URL=http://YOUR_EC2_PUBLIC_IP:5000   # Linux/macOS
# $env:VITE_API_URL="http://YOUR_EC2_PUBLIC_IP:5000" # PowerShell

npm run build:client
aws s3 sync client/dist/ s3://YOUR_BUCKET_NAME --delete
```

---

## Demo accounts (no sign-up API)

ShopFlow has **login only** — there is no `POST /api/auth/register` or public endpoint to create users. All accounts come from the database seed (`npm run seed`).

After seeding, two demo users are available:

| Name | Email | Password | Notes |
| ---- | ----- | -------- | ----- |
| Demo Shopper | `shopper@shopflow.com` | `password123` | Browse, cart, and checkout only |
| Admin User | `admin@shopflow.com` | `password123` | Full access + create, edit, and delete products |

To add or reset users in production, SSH into EC2 and re-run:

```bash
cd ~/shopflow
npm run seed
```

> **Warning:** `npm run seed` clears and re-inserts **all** users and products. Only run this when you intend to reset demo data.

### Admin product management

Log in as **`admin@shopflow.com`** to:

- **Create** — “Create product” on the catalog page (`/products/new`)
- **Edit** — “Edit product” on any product detail page (`/products/:id/edit`)
- **Delete** — “Delete product” at the bottom of the detail page (in-app confirmation modal)

**`shopper@shopflow.com`** can shop and use checkout but does not see create, edit, or delete controls.

---

## Shopping cart (per user, cross-browser)

Each logged-in user has their **own cart**, stored on the server in MongoDB (not in the browser alone).

| Behavior | Detail |
| -------- | ------ |
| **Per user** | `shopper@shopflow.com` and `admin@shopflow.com` each have separate carts. Logging out and back in as the same user restores that user's cart. |
| **Cross-browser** | Log in as the same user on Chrome, Firefox, or another device — the cart loads from `GET /api/cart` and stays in sync after changes. |
| **Sync** | Add, update quantity, or remove items → the client debounces updates to `PUT /api/cart`. Checkout clear uses `DELETE /api/cart`. |

**Quick cross-browser test after deploy:**

1. Log in as `shopper@shopflow.com` in Browser A → add items to cart.
2. Open the S3 site in Browser B → log in as the same account → cart should match.
3. Log in as `admin@shopflow.com` in either browser → cart should be empty (or show only what that admin user added).

---

## Post-deploy checklist

- [ ] `curl http://EC2_PUBLIC_IP:5000/health` returns `{"status":"ok"}`
- [ ] S3 website URL loads the login page
- [ ] Browser DevTools → Network shows API calls going to `VITE_API_URL`, not `localhost`
- [ ] Login works with both demo accounts (see table above)
- [ ] Cart syncs for the same user across two browsers
- [ ] Different users see separate carts
- [ ] No CORS errors in the browser console

---

## Troubleshooting

### "Unable to reach the server" / network errors in the browser

- Confirm `VITE_API_URL` in GitHub secrets matches your EC2 public IP and port.
- Rebuild and redeploy the frontend after changing the API URL.
- Check EC2 security group allows inbound TCP on port `5000`.
- Verify PM2 is running: `pm2 status` and `pm2 logs shopflow-api`.

### CORS errors in the browser console

- Ensure `cors` is enabled in `server/src/app.ts` (already in the repo).
- Redeploy the backend after pulling latest code.
- If using `CORS_ORIGIN`, ensure it exactly matches your S3 website URL (scheme + host, no trailing path).

### API works with `curl` but not from S3

This is almost always CORS or a wrong `VITE_API_URL` in the client build. The API may be fine; the browser is blocking the cross-origin request.

### Images or products missing after deploy

Re-run the seed on EC2 if needed:

```bash
cd ~/shopflow
npm run seed
```

### GitHub Actions SSH deploy fails

- Verify `EC2_HOST`, `EC2_USERNAME`, and `EC2_SSH_KEY` secrets.
- Ensure the EC2 security group allows SSH from GitHub Actions (or `0.0.0.0/0` for testing).
- Confirm the repo exists at `~/shopflow` on the instance and `shopflow-api` is registered in PM2.

---

## Related files

| Path | Purpose |
| ---- | ------- |
| `.github/workflows/frontend.yml` | S3 deploy workflow |
| `.github/workflows/backend.yml` | EC2 deploy workflow |
| `server/src/app.ts` | CORS configuration |
| `client/.env.local` | Local `VITE_API_URL` (not used in CI) |
| `server/.env` | Server secrets on EC2 (never commit) |
