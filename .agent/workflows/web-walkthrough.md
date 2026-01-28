---
description: Complete walkthrough and architecture guide for the Chill Code Learn Web application
---

# Chill Code Learn - Web Application Walkthrough

## Overview

**Project Name**: `chill-code-learn` (Chill Code Learn)  
**Framework**: Next.js 16.1.1 with React 19  
**Styling**: SCSS with Sass 1.97.1  
**Architecture**: Domain-Driven Design (DDD) with Clean Architecture principles

This is a flashcard learning platform built with a **Neo-Brutalist** design aesthetic featuring bold borders, strong shadows, and a vibrant color palette (Turquoise, Light Green, Light Yellow).

---

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16.1.1 (App Router) |
| UI Library | React 19.2.3 |
| Styling | SCSS (Sass) |
| Auth Storage | js-cookie |
| TypeScript | 5.x |
| Build Tool | Next.js built-in |

---

## Directory Structure

```
web/
├── src/
│   ├── app/                    # Next.js App Router (Presentation Layer)
│   │   ├── (routes)/           # Route groups
│   │   │   ├── home/           # /home page
│   │   │   ├── login/          # /login page
│   │   │   └── register/       # /register page
│   │   ├── components/         # Feature-specific components
│   │   │   └── Auth/           # Authentication forms
│   │   │       ├── LoginForm/
│   │   │       └── RegisterForm/
│   │   ├── providers/          # React Context providers
│   │   │   └── auth.context.tsx
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Root page (session validation)
│   │   └── globals.scss        # Global styles & CSS variables
│   │
│   ├── domains/                # Core Business Logic (Framework Agnostic)
│   │   └── user/
│   │       ├── entities/
│   │       │   └── user.entity.ts
│   │       ├── repositories/
│   │       │   ├── user.repository.ts      # Interface
│   │       │   └── api-auth.repository.ts  # Implementation
│   │       ├── usecases/
│   │       │   └── auth.usecase.ts
│   │       └── index.ts        # Barrel exports
│   │
│   ├── shared/                 # Cross-Cutting Concerns
│   │   ├── components/         # Reusable UI components
│   │   │   ├── Badge/
│   │   │   ├── Button/
│   │   │   ├── Card/
│   │   │   ├── Input/
│   │   │   ├── Toast/
│   │   │   └── index.ts
│   │   ├── constants/
│   │   │   └── card-messages.ts
│   │   ├── kernel/
│   │   │   └── entity.base.ts  # Base Entity class
│   │   ├── styles/
│   │   └── http-client.ts      # HTTP client with auth
│   │
│   ├── di/                     # Dependency Injection
│   │   └── container.ts
│   │
│   └── proxy.ts                # Next.js middleware for auth routing
│
├── public/                     # Static assets
├── package.json
├── tsconfig.json
└── next.config.ts
```

---

## Architecture Layers

### 1. Domain Layer (`src/domains/`)

Framework-agnostic business logic. Contains:

- **Entities**: Domain models with business logic
- **Repositories (Interfaces)**: Abstract contracts for data access
- **Use Cases**: Application services orchestrating domain logic

**Current Domain: User**

```typescript
// Entity: src/domains/user/entities/user.entity.ts
export class User extends Entity<UserProps> {
    get email(): string;
    get name(): string;
    get token(): string | undefined;
    static create(props: UserProps, id?: string): User;
    toJSON(): object;
}

// Repository Interface: src/domains/user/repositories/user.repository.ts
export interface UserRepository {
    login(email: string, password: string): Promise<User | null>;
    register(email: string, password: string, name?: string): Promise<User | null>;
    getCurrentUser(): Promise<User | null>;
    logout(): Promise<void>;
}

// Use Case: src/domains/user/usecases/auth.usecase.ts
export class AuthUseCase {
    constructor(private readonly userRepository: UserRepository);
    async login(email: string, password: string): Promise<User | null>;
    async register(email: string, password: string, name?: string): Promise<User | null>;
    async logout(): Promise<void>;
    async getCurrentUser(): Promise<User | null>;
}
```

### 2. Shared Layer (`src/shared/`)

Cross-cutting concerns and reusable components:

- **Kernel**: Base classes (Entity base with id, createdAt, updatedAt)
- **HTTP Client**: Centralized HTTP wrapper with auth token handling
- **Components**: Reusable UI components (Button, Input, Card, Badge, Toast)
- **Constants**: Application-wide constants

**HTTP Client Features** (`src/shared/http-client.ts`):
- Automatic JWT token attachment from cookies
- 401 handling with automatic redirect to `/login`
- Toast notifications for success/error responses
- Methods: `get<T>`, `post<T>`, `patch<T>`, `delete`
- Base URL: `http://localhost:3001`

### 3. Presentation Layer (`src/app/`)

Next.js App Router with:

- **Routes**: Page components using route groups `(routes)`
- **Components**: Feature-specific composite components
- **Providers**: React Context for global state (Auth)
- **Layout**: Root layout with AuthProvider and ToastProvider

### 4. Dependency Injection (`src/di/`)

Simple DI container wiring repositories to use cases:

```typescript
// src/di/container.ts
import { AuthUseCase } from "@/domains/user";
import { ApiAuthRepository } from "@/domains/user/repositories/api-auth.repository";

const authRepository = new ApiAuthRepository();
export const authUseCase = new AuthUseCase(authRepository);
```

---

## Authentication Flow

### Middleware (`src/proxy.ts`)

Controls route access based on session:

- **Public paths**: `/login`, `/register`
- **Protected paths**: All other routes
- **Redirects**:
  - No session + protected path → `/login`
  - Has session + `/login` or `/` → `/home`

### Auth Context (`src/app/providers/auth.context.tsx`)

Provides authentication state and methods:

```typescript
interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, name?: string) => Promise<void>;
    logout: () => Promise<void>;
}
```

### Token Storage

- **Cookie: `auth_token`** - JWT token (7 days expiry)
- **Cookie: `user_data`** - User data JSON (7 days expiry)

---

## Shared Components

### Button (`@shared/components/Button`)
```tsx
<Button
    variant="primary" | "secondary" | "accent" | "outline" | "ghost"
    size="small" | "medium"
    fullWidth={boolean}
    disabled={boolean}
>
```

### Input (`@shared/components/Input`)
```tsx
<Input
    label="Label"
    error="Error message"
    type="text" | "email" | "password"
    placeholder="..."
/>
```

### Card (`@shared/components/Card`)
```tsx
<Card
    title="Title"
    className="..."
    onClick={() => {}}
    compact={boolean}
>
```

### Badge (`@shared/components/Badge`)
```tsx
<Badge variant="default" | "primary" | "accent" | "outline">
```

### Toast System (`@shared/components/Toast`)

Global notification system with manager:

```typescript
// Import and use
import { toastManager } from '@shared/components';

toastManager.success("Success message");
toastManager.error("Error message");
toastManager.info("Info message");
toastManager.warning("Warning message");
```

The `ToastProvider` must wrap the app (done in `layout.tsx`).

---

## Design System

### Color Palette (CSS Variables in `globals.scss`)

| Variable | Value | Description |
|----------|-------|-------------|
| `--primary` | `#20B2AA` | Turquoise |
| `--secondary` | `#7CC67C` | Light Green |
| `--accent` | `#F9E076` | Light Yellow |
| `--background` | `#ffffff` | White bg |
| `--foreground` | `#1a1a1a` | Dark text |
| `--border` | `#1a1a1a` | Black borders |
| `--shadow` | `#1a1a1a` | Black shadows |

### Neo-Brutalist Style Classes

- `.brutalist-card` - Card with 4px border, 8px shadow
- `.brutalist-button` - Button with 4px border, 4px shadow
- `.brutalist-input` - Input with 4px border

### Typography

- Font: Geist Sans (Google Fonts)
- Headings: Uppercase, font-weight 900, letter-spacing -1px

---

## Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `page.tsx` | Session validation, redirects |
| `/login` | `LoginForm` | User login |
| `/register` | `RegisterForm` | User registration |
| `/home` | `Home` | Home page (authenticated) |

---

## API Integration

Backend API runs on `http://localhost:3001`

### Endpoints (inferred from code)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/login` | User login |
| POST | `/auth/register` | User registration |

### Response Format

```typescript
// Login/Register Response
{
    token: string;
    user: {
        id: string;
        email: string;
        name: string;
    };
    message?: string; // Optional success message (triggers toast)
}
```

---

## Path Aliases (tsconfig.json)

| Alias | Path |
|-------|------|
| `@/*` | `./src/*` |
| `@shared/*` | `./src/shared/*` |

---

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

---

## Key Files Quick Reference

| Purpose | File Path |
|---------|-----------|
| Root Layout | `src/app/layout.tsx` |
| Auth Provider | `src/app/providers/auth.context.tsx` |
| HTTP Client | `src/shared/http-client.ts` |
| DI Container | `src/di/container.ts` |
| Route Middleware | `src/proxy.ts` |
| Global Styles | `src/app/globals.scss` |
| User Entity | `src/domains/user/entities/user.entity.ts` |
| Auth Use Case | `src/domains/user/usecases/auth.usecase.ts` |
| Toast System | `src/shared/components/Toast/` |

---

## Notes for Future Development

1. **Adding New Domains**: Create folder in `src/domains/` with entities, repositories, and usecases subdirectories
2. **Adding New Routes**: Create folder in `src/app/(routes)/` with `page.tsx`
3. **Adding Shared Components**: Add to `src/shared/components/` and export in `index.ts`
4. **Protected Routes**: Middleware in `proxy.ts` handles authentication checks
5. **API Calls**: Use `httpClient` from `@shared/http-client` for automatic auth and toast handling