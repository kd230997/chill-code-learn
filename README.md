# Chill Code Learn

This project is a full-stack application consisting of a NestJS API and a Next.js Web frontend. It includes features like user authentication and a Tic-Tac-Toe game.

## Project Structure

- `api/`: NestJS backend with Prisma ORM.
- `web/`: Next.js frontend with React 19.
- `sql/`: Initial database data and migration scripts.
- `scripts/`: Infrastructure and deployment scripts (e.g., Nginx).

---

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)
- [MySQL](https://www.mysql.com/) database

---

## 1. API Setup (Backend)

The API is built using **NestJS** and uses **Prisma** to interact with a MySQL database.

1.  **Navigate to the API directory:**
    ```bash
    cd api
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Create a `.env` file in the `api/` directory (if it doesn't exist) and add your database connection string:
    ```env
    DATABASE_URL="mysql://username:password@localhost:3306/chill_db_db"
    PORT=3001
    VERSION=1.0
    ```

4.  **Database Migration & Client Generation:**
    Generate the Prisma client and run migrations to set up the database schema:
    ```bash
    npx prisma generate
    npx prisma migrate dev
    ```

5.  **Run the API:**
    ```bash
    # Development mode (with watch)
    npm run start:dev
    ```
    The API will be available at `http://localhost:3001`. You can access the Swagger documentation at `http://localhost:3001/swagger`.

---

## 2. Web Setup (Frontend)

The frontend is a **Next.js** application.

1.  **Navigate to the Web directory:**
    ```bash
    cd ../web
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the Web application:**
    ```bash
    npm run dev
    ```
    The Web app will be available at `http://localhost:3000`.

---

## Initial Data (Optional)

If you need to seed the database with initial users, you can use the SQL script found in the `sql/` directory:

```bash
# Run this against your MySQL database
mysql -u your_username -p chill_db_db < sql/_User__202601250039.sql
```

Default users in the script:
- **Admin**: `admin@gmail.com`
- **User**: `user@example.com`

---

## Key Technologies

- **API**: NestJS, Prisma, Passport (JWT), Swagger.
- **Web**: Next.js 15, React 19, Sass, Cookies for session management.
- **Database**: MySQL.
