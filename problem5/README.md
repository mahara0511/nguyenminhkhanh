# API

This project is a REST API built with Node.js, Express, TypeORM, Zod, Pino Logger, and Swagger UI.
It supports product CRUD operations, pagination, search, sorting, and response mapping via DTOs.

## 1. Installation

Clone the project and install dependencies:

```bash
npm install
```

## 2. Environment Configuration

Create a `.env` file in the project root by copying `example.env` and updating the values as needed.

The project uses Neon PostgreSQL, which requires SSL (`sslmode=require`).

## 3. Running the Project

Start the development server:

```bash
npm run dev
```

Or run the production build:

```bash
npm run build
npm start
```

## 4. Migrations

Generate a migration:

```bash
npm run migration:generate
```

Run migrations:

```bash
npm run migration:run
```

Revert the latest migration:

```bash
npm run migration:revert
```

## 5. Swagger API Docs

After the server starts, open the API documentation at:

```
http://localhost:8080/docs
```
