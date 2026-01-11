# Auth Service

JWT authentication service with TypeScript and PostgreSQL.

## Features
- User registration/login
- JWT tokens
- Role-based access
- PostgreSQL + Prisma
- Docker setup

## Setup
```bash
cp .env.example .env
docker compose up -d
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

## Endpoints
- POST /auth/register
- POST /auth/login  
- GET /me (auth required)
- GET /health
