---
description: How to create a new page in the Chill Code Learn web application
---

# Create New Page Workflow

This workflow guides you through creating a new page in the Next.js web application following the established project structure and conventions.

---

## Project Structure

```
web/src/
├── app/
│   ├── (routes)/                    # Route group for pages
│   │   ├── home/
│   │   │   └── page.tsx             # Route: /home
│   │   ├── login/
│   │   │   └── page.tsx             # Route: /login
│   │   └── register/
│   │       └── page.tsx             # Route: /register
│   │
│   ├── components/                   # Feature-specific components
│   │   └── [Feature]/               # e.g., Auth, Dashboard
│   │       └── [ComponentName]/
│   │           ├── ComponentName.tsx
│   │           └── ComponentName.module.scss
│   │
│   ├── providers/                    # React context providers
│   │   ├── auth.context.tsx
│   │   └── theme.context.tsx        # Theme uses CSS classes (.light/.dark)
│   │
│   ├── globals.scss                  # 🎨 SINGLE SOURCE OF TRUTH for all design tokens
│   ├── layout.tsx                    # Root layout
│   └── page.tsx                      # Root page (/)
│
├── shared/
│   ├── components/                   # Reusable UI components
│   │   ├── Badge/
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Input/
│   │   ├── Toast/
│   │   └── index.ts                  # Barrel export
│   │
│   ├── styles/
│   │   └── _variables.scss           # Static values (transitions) & mixins ONLY
│   │
│   ├── constants/                    # Shared constants
│   ├── kernel/                       # Core utilities
│   └── http-client.ts                # API client
│
├── domains/                          # Domain models & types
└── di/                              # Dependency injection
```

---

## 🎨 Styling Architecture (CRITICAL)

### Single Source of Truth: `globals.scss`

All colors and design tokens are defined in `globals.scss` as CSS custom properties.

**Theme switching uses CSS classes:** `.light` and `.dark` on `<html>`

### _variables.scss Contains ONLY:
- Transitions: `$transition-fast`, `$transition-smooth`
- Border radius (SCSS versions): `$radius-sm`, `$radius-md`, `$radius-lg`, `$radius-pill`
- Mixins: `aero-card`, `aero-button`, `aero-input`, `aero-background`

### ❌ NEVER Use SCSS Variables for Colors
```scss
// ❌ WRONG - These don't exist anymore!
color: $primary;
background: $gray-100;
color: $text-dark;
```

### ✅ ALWAYS Use CSS Custom Properties
```scss
// ✅ CORRECT - Theme-aware
color: var(--primary);
background: var(--card-bg);
color: var(--text-primary);
```

---

## Naming Conventions (CONSTRAINTS)

### SCSS Class Names
- **MUST use kebab-case** for all CSS class names
- ❌ `.cardTitle`, `.iconWrapper`, `.fullWidth`
- ✅ `.card-title`, `.icon-wrapper`, `.full-width`

### In TSX files, use bracket notation for kebab-case classes:
```tsx
// ✅ Correct
className={styles["card-title"]}
className={styles["icon-wrapper"]}

// ❌ Wrong (causes syntax error)
className={styles.card-title}
```

### Single-word classes can use dot notation:
```tsx
className={styles.container}
className={styles.form}
```

### File Naming
- **Pages**: `page.tsx` (Next.js convention)
- **Page Components**: `[PageName]Page.tsx` (e.g., `HomePage.tsx`, `LoginPage.tsx`) - **MUST follow this pattern**
- **Other Components**: `PascalCase.tsx` (e.g., `LoginForm.tsx`, `UserCard.tsx`)
- **SCSS Modules**: `PascalCase.module.scss` (e.g., `HomePage.module.scss`)
- **Route folders**: `lowercase` or `kebab-case` (e.g., `login/`, `user-profile/`)

---

## Steps to Create a New Page

### Step 1: Create the Route Folder

Create a new folder under `src/app/(routes)/` with the route name:

```
src/app/(routes)/[route-name]/page.tsx
```

Example for a `/dashboard` route:
```
src/app/(routes)/dashboard/page.tsx
```

### Step 2: Create the Page File

Create `page.tsx` with a **default export**:

```tsx
// src/app/(routes)/dashboard/page.tsx
import { DashboardView } from '@/app/components/Dashboard/DashboardView/DashboardView';

export default function DashboardPage() {
    return <DashboardView />;
}
```

> ⚠️ **CRITICAL**: Pages MUST use `export default function` - named exports will cause build errors.

### Step 3: Create the Feature Component Folder

Create a folder for the feature under `src/app/components/`:

```
src/app/components/[Feature]/[ComponentName]/
├── ComponentName.tsx
└── ComponentName.module.scss
```

Example:
```
src/app/components/Dashboard/DashboardView/
├── DashboardView.tsx
└── DashboardView.module.scss
```

### Step 4: Create the Component File

```tsx
// src/app/components/Dashboard/DashboardView/DashboardView.tsx
"use client";  // Add only if using hooks, state, or browser APIs

import { useState } from "react";
import { Button, Card, Input } from "@shared/components";
import styles from "./DashboardView.module.scss";

export function DashboardView() {
    const [data, setData] = useState("");

    return (
        <div className={styles.container}>
            <Card className={styles["dashboard-card"]}>
                <h1 className={styles["page-title"]}>Dashboard</h1>
                {/* Component content */}
            </Card>
        </div>
    );
}
```

### Step 5: Create the SCSS Module

```scss
// src/app/components/Dashboard/DashboardView/DashboardView.module.scss
@use "@/shared/styles/_variables.scss" as *;

.container {
    @include aero-background;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
}

.dashboard-card {
    max-width: 800px;
    width: 100%;
    background: var(--glass-bg-solid);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
}

.page-title {
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--text-primary);  // ✅ Uses CSS custom property
    margin-bottom: 1rem;
}
```

### Step 6: Add Form Inputs with IDs

All form inputs MUST have unique `id` attributes for accessibility and testing:

```tsx
<Input
    id="dashboard-search"
    label="Search"
    type="text"
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    placeholder="Search..."
/>
```

ID format: `[page-name]-[field-name]`

---

## Available Shared Components

Import pure UI components from `@shared/components`:

| Component | Usage |
|-----------|-------|
| `Button` | Primary actions, variants: `primary`, `secondary`, `accent`, `outline`, `ghost` |
| `Card` | Content containers with glassmorphism effect |
| `Input` | Form inputs with label and error support |
| `Badge` | Status indicators |
| `Toast` | Pure toast UI component (used internally by ToastProvider) |
| `Navbar` | Pure navigation bar (use NavbarContainer in layout) |

```tsx
import { Button, Card, Input, Badge } from "@shared/components";
```

## Available Providers

Import providers and hooks from `@/app/providers/`:

| Provider | Hook | Import |
|----------|------|--------|
| `ToastProvider` | `useToast()` | `@/app/providers/toast.context` |
| `ThemeProvider` | `useTheme()` | `@/app/providers/theme.context` |
| `AuthProvider` | `useAuth()` | `@/app/providers/auth.context` |

```tsx
import { useToast } from "@/app/providers/toast.context";
import { useTheme } from "@/app/providers/theme.context";
import { useAuth } from "@/app/providers/auth.context";
```

---

## Available CSS Custom Properties

All defined in `globals.scss` - the **single source of truth**:

### Colors
| Variable | Description |
|----------|-------------|
| `--primary` | Primary brand color |
| `--primary-light` | Lighter primary |
| `--primary-dark` | Darker primary |
| `--secondary` | Secondary/accent color |
| `--accent` | Accent color |

### Text
| Variable | Description |
|----------|-------------|
| `--text-primary` | Main text color |
| `--text-secondary` | Secondary text |
| `--text-muted` | Muted/disabled text |

### Surfaces
| Variable | Description |
|----------|-------------|
| `--background` | Page background |
| `--background-gradient` | Gradient background |
| `--glass-bg` | Semi-transparent glass |
| `--glass-bg-solid` | More opaque glass |
| `--glass-border` | Glass border |
| `--card-bg` | Card background |
| `--input-bg` | Input background |
| `--input-border` | Input border |

### Effects
| Variable | Description |
|----------|-------------|
| `--shadow-sm` | Small shadow |
| `--shadow-md` | Medium shadow |
| `--shadow-lg` | Large shadow |
| `--shadow-glow` | Glow effect |
| `--primary-glow` | Primary color glow |

### Status
| Variable | Description |
|----------|-------------|
| `--error-text` | Error text color |
| `--error-bg` | Error background |
| `--error-border` | Error border |
| `--success-text` | Success text color |
| `--success-bg` | Success background |
| `--success-border` | Success border |

### Layout
| Variable | Description |
|----------|-------------|
| `--radius-sm` | Small border radius (12px) |
| `--radius-md` | Medium border radius (20px) |
| `--radius-lg` | Large border radius (28px) |
| `--radius-pill` | Pill border radius (50px) |

---

## Theme System (Light/Dark Mode)

The application supports light and dark themes via CSS custom properties and CSS classes.

### How It Works
- Theme class (`.light` or `.dark`) is applied to `<html>` element
- CSS custom properties automatically update based on the class
- All components using `var(--*)` automatically adapt

### Accessing Theme in Components
```tsx
import { useTheme } from '@/app/providers/theme.context';

function MyComponent() {
    const { theme, toggleTheme } = useTheme();
    // theme is 'light' or 'dark'
}
```

### Writing Theme-Aware Styles
```scss
// Just use CSS custom properties - they auto-switch!
.my-component {
    color: var(--text-primary);      // Dark in light mode, light in dark mode
    background: var(--glass-bg-solid); // White-ish in light, dark slate in dark
    box-shadow: var(--shadow-lg);    // Lighter in light mode, darker in dark mode
}

// Decorative gradients - use opacity instead of rgba with CSS vars
.decorative-blob {
    background: linear-gradient(135deg, var(--primary), var(--accent));
    opacity: 0.3;
}
```

---

## Error Handling Pattern

Use consistent error handling in async functions:

```tsx
const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
        await someAsyncOperation();
    } catch (err) {
        const message = err instanceof Error 
            ? err.message 
            : "Operation failed. Please try again.";
        setError(message);
    } finally {
        setLoading(false);
    }
};
```

---

## Checklist

Before completing a new page, verify:

- [ ] Route folder created under `src/app/(routes)/`
- [ ] Page uses `export default function`
- [ ] Feature component folder created under `src/app/components/`
- [ ] SCSS class names use **kebab-case**
- [ ] TSX uses bracket notation for kebab-case classes
- [ ] Form inputs have unique `id` attributes
- [ ] Error handling uses `err instanceof Error` pattern
- [ ] `"use client"` added if using hooks/state
- [ ] Shared components imported from `@shared/components`
- [ ] SCSS imports `@use "@/shared/styles/_variables.scss" as *`
- [ ] **All colors use CSS custom properties (`var(--*)`)**
- [ ] **No SCSS color variables (`$primary`, `$gray-*`, etc.)**
- [ ] Build passes: `npm run build`
- [ ] Lint passes: `npm run lint`
