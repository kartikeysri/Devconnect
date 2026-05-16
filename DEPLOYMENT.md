# DevConnect Deployment Guide

This project is prepared for:

- Frontend: Vercel
- Backend: Render
- Database: Supabase Postgres Free

Important structure note:

- `frontend/` contains the React + Vite app
- the Spring Boot backend is at the repository root

Assumption used for this setup:

- you are migrating configuration from MySQL to PostgreSQL
- you do not need an automated data migration from an existing live MySQL database

If you already have important MySQL data, the app changes are done, but the data itself must still be exported and imported separately.

## Phase 0. What you upload

You should upload the whole project to one GitHub repository.

Use the same repository for both platforms:

- Vercel will use the `frontend/` folder as its project root
- Render will use the repository root for the Spring Boot backend

Main files used by deployment:

- Backend:
  - `pom.xml`
  - `Dockerfile`
  - `render.yaml`
  - `src/main/resources/application.yml`
  - `src/main/java/...`
- Frontend:
  - `frontend/package.json`
  - `frontend/vercel.json`
  - `frontend/.env.example`
  - `frontend/src/services/api.js`

## Phase 1. Supabase database

Create the database first.

### What to do

1. Go to Supabase and create a new project on the Free plan.
2. Wait until the Postgres database is ready.
3. Open:
   - `Project Settings`
   - `Database`
   - `Connection string`
4. Choose the `Session pooler` connection string.

Use `Session pooler` for Spring Boot because Supabase recommends session mode for persistent application clients, and it supports both IPv4 and IPv6.

### What values you need from Supabase

From Supabase you will copy:

- host
- port
- database name, usually `postgres`
- username, usually like `postgres.PROJECT_REF`
- password

### Render backend env format

Build your backend env values like this:

```text
DB_URL=jdbc:postgresql://YOUR_SUPABASE_POOLER_HOST:5432/postgres?sslmode=require
DB_USERNAME=postgres.YOUR_PROJECT_REF
DB_PASSWORD=YOUR_SUPABASE_DB_PASSWORD
```

Example shape:

```text
DB_URL=jdbc:postgresql://aws-0-ap-south-1.pooler.supabase.com:5432/postgres?sslmode=require
DB_USERNAME=postgres.xxxxxxxxxxxxx
DB_PASSWORD=your-password
```

### Files to upload here

- No project file is uploaded directly to Supabase.
- Supabase only gives you database credentials.

## Phase 2. Render backend

Deploy the Spring Boot API after Supabase is ready.

### What Render will use from your repo

Render reads these files from your GitHub repo:

- `Dockerfile`
- `pom.xml`
- `render.yaml`
- `src/main/resources/application.yml`
- all backend source files under `src/main/java`

### What to upload

Upload the whole project to GitHub first.

Then in Render:

1. Create a new `Web Service`
2. Connect your GitHub repository
3. Runtime: `Docker`
4. Root directory: repository root
5. Dockerfile path: `./Dockerfile`
6. Plan: `Free`

### Backend environment variables on Render

Set these in the Render dashboard:

Required:

- `DB_URL`
- `DB_USERNAME`
- `DB_PASSWORD`
- `JWT_SECRET`

Recommended:

- `APP_CORS_ALLOWED_ORIGINS`
- `SPRING_JPA_HIBERNATE_DDL_AUTO`
- `JWT_EXPIRATION`

Recommended values:

```text
DB_URL=jdbc:postgresql://YOUR_SUPABASE_POOLER_HOST:5432/postgres?sslmode=require
DB_USERNAME=postgres.YOUR_PROJECT_REF
DB_PASSWORD=YOUR_SUPABASE_DB_PASSWORD
JWT_SECRET=BASE64_ENCODED_32_BYTE_SECRET
APP_CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173,https://your-frontend-project.vercel.app,https://*.vercel.app
SPRING_JPA_HIBERNATE_DDL_AUTO=update
JWT_EXPIRATION=86400000
```

### Generate JWT secret

PowerShell:

```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 } | ForEach-Object { [byte]$_ }))
```

### Health check

Render health check path:

```text
/api/health
```

After deployment, test:

```text
https://your-render-service.onrender.com/api/health
```

Expected response:

```json
{"status":"UP"}
```

### Important free-tier note

Render free web services spin down after idle time. First request after idle can be slow.

## Phase 3. Vercel frontend

Deploy the frontend after the backend URL is live.

### What Vercel will use from your repo

Vercel should use `frontend/` as the project root.

Files used:

- `frontend/package.json`
- `frontend/vercel.json`
- `frontend/src/services/api.js`
- all frontend files under `frontend/src`

### What to upload

Do not upload only selected frontend files manually.

Instead:

1. Use the same GitHub repository
2. In Vercel, import the repository
3. Set `Root Directory` to:

```text
frontend
```

### Vercel project settings

- Framework preset: `Vite`
- Root directory: `frontend`
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

### Frontend environment variables on Vercel

Required:

- `VITE_API_BASE_URL`

Optional:

- `VITE_RECAPTCHA_SITE_KEY`

Recommended:

```text
VITE_API_BASE_URL=https://your-render-service.onrender.com
```

### SPA routing

`frontend/vercel.json` already rewrites routes to `index.html`, so these work after refresh:

- `/`
- `/login`
- `/register`
- `/feed`
- `/profile/:username`

## Phase 4. Final integration

Deploy in this order:

1. Supabase
2. Render
3. Vercel

### Final linking steps

1. Deploy backend on Render
2. Copy the Render URL
3. Set `VITE_API_BASE_URL` in Vercel
4. Deploy frontend on Vercel
5. Copy the Vercel production URL
6. Add that URL to Render `APP_CORS_ALLOWED_ORIGINS`
7. Redeploy Render

Example final CORS value:

```text
APP_CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173,https://your-project.vercel.app,https://*.vercel.app
```

## Phase 5. Local run after migration

### Backend local env

You can use local PostgreSQL:

```text
DB_URL=jdbc:postgresql://localhost:5432/devconnect?sslmode=disable
DB_USERNAME=postgres
DB_PASSWORD=postgres
```

### Local commands

Backend:

```powershell
mvn.cmd spring-boot:run
```

Frontend:

```powershell
cd frontend
Copy-Item .env.example .env
npm.cmd install
npm.cmd run dev
```

## Phase 6. Validation checklist

- `GET /api/health` returns `200`
- Render backend starts successfully
- Supabase accepts the backend connection
- Vercel frontend loads successfully
- register works
- login works
- protected API calls include JWT
- feed, profile, search, trending APIs work
- browser refresh works on Vercel routes
