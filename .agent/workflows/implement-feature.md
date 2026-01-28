---
description: How to implement a new feature in the Chill Code Learn web application
---

# Implement New Feature Workflow

This workflow guides you through implementing a new feature following the established architecture, conventions, and best practices.

---

## Pre-Implementation Checklist

Before writing any code, complete these steps:

### 1. Review Existing Shared Components

**RULE: Always check if a shared component exists before creating a new one.**

Available shared components in `@shared/components`:

| Component | Usage | Import |
|-----------|-------|--------|
| `Button` | Actions, variants: `primary`, `secondary`, `accent`, `outline`, `ghost` | `import { Button } from '@shared/components'` |
| `Card` | Content containers with glassmorphism | `import { Card } from '@shared/components'` |
| `Input` | Form inputs with label and error support | `import { Input } from '@shared/components'` |
| `Badge` | Status indicators | `import { Badge } from '@shared/components'` |
| `Toast` | Pure toast UI component (used by ToastProvider) | `import { Toast } from '@shared/components'` |
| `ThemeToggle` | Dark/light mode toggle | `import { ThemeToggle } from '@shared/components'` |
| `Navbar` | Pure navigation bar (use NavbarContainer in app) | `import { Navbar } from '@shared/components'` |

### 2. Review Available Providers

| Provider | Purpose | Hook | Import |
|----------|---------|------|--------|
| `AuthProvider` | User authentication state | `useAuth()` | `@/app/providers/auth.context` |
| `ThemeProvider` | Light/dark theme management | `useTheme()` | `@/app/providers/theme.context` |
| `ToastProvider` | Toast notification system | `useToast()` | `@/app/providers/toast.context` |

### 3. Review Available Styles

**IMPORTANT: All colors are centralized in `globals.scss`. Use CSS custom properties exclusively!**

```scss
@use "@/shared/styles/_variables.scss" as *;
```

**Mixins:** `aero-card`, `aero-button`, `aero-input`, `aero-background`

**Static Values:** `$transition-fast`, `$transition-smooth`, `$radius-sm`, `$radius-md`, `$radius-lg`, `$radius-pill`

---

## 🎨 Styling Rules (CRITICAL)

### Single Source of Truth: `globals.scss`

All design tokens are defined in `globals.scss`. **NEVER use SCSS color variables!**

### ❌ WRONG - Using SCSS Variables for Colors
```scss
color: $primary;
background: $gray-100;
box-shadow: $shadow-sm;
```

### ✅ CORRECT - Using CSS Custom Properties
```scss
color: var(--primary);
background: var(--glass-bg);
box-shadow: var(--shadow-sm);
```

### Available CSS Custom Properties

| Category | Variables |
|----------|-----------|
| **Colors** | `--primary`, `--primary-light`, `--primary-dark`, `--secondary`, `--accent` |
| **Text** | `--text-primary`, `--text-secondary`, `--text-muted` |
| **Glass** | `--glass-bg`, `--glass-bg-solid`, `--glass-border` |
| **Shadows** | `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-glow`, `--primary-glow` |
| **Surfaces** | `--card-bg`, `--card-border`, `--input-bg`, `--input-border` |
| **Status** | `--error-text`, `--error-bg`, `--error-border`, `--success-text`, `--success-bg`, `--success-border` |
| **Layout** | `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-pill` |
| **UI** | `--toggle-bg`, `--toggle-border`, `--scrollbar-track`, `--scrollbar-thumb` |

---

## Implementation Steps

### Step 1: Plan the Feature

1. **Define the scope** - What exactly should this feature do?
2. **Identify components needed** - UI elements required
3. **Check shared components** - Can existing components be reused?
4. **Plan API integration** - Backend endpoints needed (if any)

### Step 2: Create Feature Folder Structure

For complex features, create a dedicated folder under `src/app/components/`:

```
src/app/components/[FeatureName]/
├── [ComponentName]/
│   ├── ComponentName.tsx
│   └── ComponentName.module.scss
├── hooks/
│   └── useFeatureName.ts       # (Optional) Custom hooks
└── types/
    └── index.ts                 # (Optional) TypeScript types
```

### Step 3: Implement Components

#### Component Template
```tsx
"use client";  // Only if using hooks, state, or browser APIs

import { useState } from "react";
import { Button, Card, Input } from "@shared/components";  // ✅ Use shared components
import styles from "./ComponentName.module.scss";

interface ComponentNameProps {
    // Define props
}

export function ComponentName({ ...props }: ComponentNameProps) {
    // Implementation
    return (
        <Card className={styles.container}>
            {/* Use shared components */}
            <Button variant="primary" onClick={handleClick}>
                Action
            </Button>
        </Card>
    );
}
```

#### SCSS Module Template
```scss
@use "@/shared/styles/_variables.scss" as *;

.container {
    // ✅ Use CSS custom properties for theme support
    color: var(--text-primary);
    background: var(--glass-bg-solid);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
}

// Use kebab-case for class names
.feature-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-primary);
}

// For decorative elements, use opacity
.decorative-blob {
    background: linear-gradient(135deg, var(--primary), var(--accent));
    opacity: 0.3;  // Use opacity instead of rgba() with CSS vars
}
```

### Step 4: Add Routes (if needed)

If the feature needs its own page:

```
src/app/(routes)/[feature-name]/page.tsx
```

```tsx
import { FeatureComponent } from '@/app/components/FeatureName/FeatureComponent/FeatureComponent';

export default function FeaturePage() {
    return <FeatureComponent />;
}
```

### Step 5: Update Proxy (if needed)

If the route should be public (no auth required), update `src/proxy.ts`:

```tsx
const PUBLIC_PATH = ["register", "login", "tic-tac-toe", "new-feature"];
```

---

## Code Conventions

### Use Shared Components (MANDATORY)

```tsx
// ❌ WRONG - Creating custom button
<button className={styles.button} onClick={handleClick}>
    Submit
</button>

// ✅ CORRECT - Using shared Button component
import { Button } from "@shared/components";
<Button variant="primary" onClick={handleClick}>
    Submit
</Button>
```

### Use CSS Custom Properties (MANDATORY)

```scss
// ❌ WRONG - Hard-coded colors won't adapt to theme
color: #2C3E50;
background: rgba(255, 255, 255, 0.85);

// ❌ WRONG - SCSS variables won't adapt to theme
color: $text-dark;
background: $glass-bg-solid;

// ✅ CORRECT - CSS custom properties (theme-aware)
color: var(--text-primary);
background: var(--glass-bg-solid);
```

### Use Kebab-Case for CSS Class Names

```scss
// ❌ WRONG
.featureCard { }
.submitButton { }

// ✅ CORRECT
.feature-card { }
.submit-button { }
```

### Form Input IDs

All form inputs must have unique IDs:
```tsx
<Input
    id="feature-name-field"  // Format: [feature]-[field]
    label="Field Name"
    value={value}
    onChange={handleChange}
/>
```

### Error Handling Pattern

```tsx
try {
    await someAsyncOperation();
} catch (err) {
    const message = err instanceof Error 
        ? err.message 
        : "Operation failed. Please try again.";
    toast.error(message);  // or setError(message)
}
```

---

## Creating New Shared Components

Only create a new shared component if:
1. ✅ No existing component meets the need
2. ✅ The component will be reused across multiple features
3. ✅ The component is generic enough to be shared

### New Shared Component Location
```
src/shared/components/[ComponentName]/
├── ComponentName.tsx
└── ComponentName.module.scss
```

### Export from Index
After creating, add to `src/shared/components/index.ts`:
```ts
export * from "./ComponentName/ComponentName";
```

---

## Testing Checklist

Before marking the feature complete:

- [ ] `npm run lint` passes with no errors
- [ ] `npm run build` passes with no errors
- [ ] Feature works in light theme
- [ ] Feature works in dark theme
- [ ] Feature is responsive (mobile/tablet/desktop)
- [ ] Shared components are used where possible
- [ ] CSS class names use kebab-case
- [ ] **CSS custom properties used for ALL colors** (no SCSS color variables)
- [ ] Form inputs have unique IDs
- [ ] Error states are handled properly

---

## Quick Reference

### Imports
```tsx
// Shared components (pure UI only)
import { Button, Card, Input, Badge } from "@shared/components";

// Providers and hooks
import { useAuth } from "@/app/providers/auth.context";
import { useTheme } from "@/app/providers/theme.context";
import { useToast } from "@/app/providers/toast.context";

// Styles
import styles from "./Component.module.scss";
```

### SCSS
```scss
@use "@/shared/styles/_variables.scss" as *;

// Use ONLY for:
// - Transitions: $transition-fast, $transition-smooth
// - Mixins: @include aero-card, @include aero-button, etc.

// Use CSS custom properties for ALL colors:
color: var(--text-primary);
background: var(--glass-bg-solid);
```
