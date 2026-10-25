# Project Submission & Review Platform

Full-stack SaaS for student project submissions and mentor review.

## Stack

| Layer | Tech |
|-------|------|
| Frontend | Next.js (App Router), TypeScript, Tailwind CSS, React Hook Form, Zod, TanStack Query, Sonner |
| Backend | Express.js, TypeScript, Prisma ORM, PostgreSQL, JWT, bcrypt, Zod, rate limiting |
| Infra | Docker Compose (PostgreSQL) |

## Quick start

### 1. Database

```bash
docker compose up -d
```

### 2. Backend

```bash
cd backend
cp .env.example .env
npm install
npx prisma migrate dev
npx prisma db seed
npm run dev
```

API: `http://localhost:5000`  
Swagger: `http://localhost:5000/api/docs`

### 3. Frontend

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

App: `http://localhost:3000`

## Demo accounts (change before production)

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@review.dev | Admin-Pass-2026 |
| Student | student@review.dev | Student-Pass-2026 |

Public signup always creates **STUDENT**. Admin is seed-only.

## API overview

### Auth
- `POST /api/auth/signup` — student signup
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`

### Student submissions
- `POST /api/submissions`
- `GET /api/submissions/my`
- `GET /api/submissions/:id`

### Admin
- `GET /api/admin/submissions?status=&page=&limit=&sortBy=&order=&q=`
- `GET /api/admin/submissions/stats`
- `GET /api/admin/submissions/:id`
- `PATCH /api/admin/submissions/:id/review`

## Policy

- New submissions start as `PENDING`
- Only admins can review; only `PENDING` can transition
- Rejection requires feedback (≥ 12 chars)
- One active (PENDING or APPROVED) submission per student + GitHub repo
- Rejected repos may be resubmitted

## Scripts

```bash
# Backend
cd backend && npm run dev
cd backend && npm test
cd backend && npm run build

# Frontend
cd frontend && npm run dev
cd frontend && npm run build
```
