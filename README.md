# Employee management system

A basic CRUD operation to display the hierarchy of employees in Chronostep, Inc., showing each employee's name, photo, and current position

## Fullstack React 19 + Express + Prisma Project

This is a fullstack web application built with **React 19** on the frontend and **Express.js** with **Prisma ORM** on the backend. It provides a robust, modern web stack for building scalable and maintainable applications.

## 🧱 Tech Stack

### Client

- [React 19](https://reactjs.org/)
- [Vite](https://vitejs.dev/)&#x20;
- [React Router](https://reactrouter.com/)&#x20;
- [Tailwind CSS](https://tailwindcss.com/)
- [React toastify](https://www.npmjs.com/package/react-toastify)

### Server

- [Express.js](https://expressjs.com/)
- [Prisma](https://www.prisma.io/) as ORM
- [PostgreSQL](https://www.postgresql.org/)
- [dotenv](https://www.npmjs.com/package/dotenv) for environment variables
- [CORS](https://www.npmjs.com/package/cors)&#x20;

## 📁 Project Structure

```
root/
├── client/              # React frontend
│   ├── public/
│   ├── src/
│   └── .env             # Frontend environment variables
├── server/              # Express backend
│   └── src/
│       ├── generated/   # Prisma generated files, no need to modify this
│       ├── interfaces/  # Model wireframe
│       ├── prisma/      # Prisma schema, model, and, seeder
│       ├── repositories/ # Handling communication with the database or other data sources.
│       ├── services/     # Handling business logic and application-specific operations.
│       └── server.ts     # All expressjs configuration, route registration, and etc.
│   └── .env             # Backend environment variables
├── README.md
```

## ⚙️ Getting Started

### Prerequisites

- Node.js ≥ 18
- PostgreSQL (or any DB you configure with Prisma)
- Yarn or npm

### 1. Clone the Repository

```bash
git clone https://github.com/chronostep-inc/chronos.git
cd chronos
```

### 2. Setup the Backend

```bash
cd server
npm install
cp .env.example .env
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
npm run dev
```

> Make sure your `server/.env` contains a valid `DATABASE_URL`.

### 3. Setup the Frontend

open new terminal

```bash
cd ../client
npm install
cp .env.example .env
npm run dev
```

> Make sure your `client/.env` contains necessary frontend environment variables (e.g., VITE_API_PROXY_URL).

## 🌐 API & Communication

The React frontend communicates with the Express backend via RESTful APIs.
