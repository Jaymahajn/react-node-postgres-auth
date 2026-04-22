# react-node-postgres-auth

Full-stack authentication app built with React, Node.js, Express, and PostgreSQL. Fully dockerized with Docker Compose.

## Stack

| Layer | Technology |
|---|---|
| Frontend | React |
| Backend | Node.js + Express |
| Database | PostgreSQL |
| Auth | JWT + bcrypt |
| DevOps | Docker + Docker Compose |

## Features

- User registration with hashed passwords
- User login with JWT token
- Dashboard showing all registered users
- Fully containerized — runs with one command

## Project Structure

```
fullproject/
├── docker-compose.yml
├── backend/
│   ├── index.js        — Node.js + Express API
│   ├── package.json
│   ├── Dockerfile
│   └── .env            — not included, see setup below
└── frontend/
    ├── src/
    │   ├── App.js      — React UI
    │   └── index.js
    ├── public/
    │   └── index.html
    ├── package.json
    └── Dockerfile
```

## Setup

**1. Clone the repo**
```bash
git clone https://github.com/Jaymahajn/react-node-postgres-auth.git
cd react-node-postgres-auth
```

**2. Create backend/.env**
```
DB_HOST=postgres
DB_USER=root
DB_PASSWORD=password123
DB_NAME=mydb
DB_PORT=5432
JWT_SECRET=your-super-secret-jwt-key
PORT=5001
```

**3. Run**
```bash
docker-compose up --build
```

## Usage

| URL | What it is |
|---|---|
| http://localhost:3000 | React frontend |
| http://localhost:5001 | Node.js backend |

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | / | Health check |
| POST | /register | Create account |
| POST | /login | Login and get JWT token |
| GET | /users | Get all users |

## Database

Access PostgreSQL directly:
```bash
docker exec -it postgres psql -U root -d mydb
```
