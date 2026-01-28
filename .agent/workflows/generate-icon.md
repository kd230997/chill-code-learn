---
description: How to add new icons to the Icon component
---

# Generate Icon Workflow

This workflow guides you through adding new icons to the shared Icon component.

---

## Icon System Overview

The Icon component is located at:
```
src/shared/components/Icon/Icon.tsx
```

### Key Features
- **SVG-based**: All icons are inline SVGs for optimal performance
- **Theme-aware**: Uses `currentColor` to inherit text color (adapts to light/dark themes)
- **Customizable**: Supports size, color, and className props
- **Accessible**: Includes aria-label support

---

## Steps to Add a New Icon

### Step 1: Find or Create SVG Path Data

Get the SVG path data for your icon. Sources:
- [Heroicons](https://heroicons.com/) - Recommended, matches our style
- [Feather Icons](https://feathericons.com/)
- [Lucide Icons](https://lucide.dev/)
- Custom design (24x24 viewBox)

**Requirements:**
- ViewBox: `0 0 24 24`
- Stroke-based icons preferred (matches aero-minimalism)
- strokeWidth: `2`
- strokeLinecap: `round`
- strokeLinejoin: `round`

### Step 2: Add Icon Name to Type

In `Icon.tsx`, add the new icon name to the `IconName` type:

```typescript
export type IconName =
    | 'home'
    | 'user'
    | 'settings'
    // ... existing icons
    | 'new-icon-name';  // Add here
```

### Step 3: Add Icon Path Data

Add the SVG path(s) to the `iconPaths` object:

```typescript
const iconPaths: Record<IconName, React.ReactNode> = {
    // ... existing icons
    'new-icon-name': (
        <path
            d="M... (your path data here)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            fill="none"
            stroke="currentColor"
        />
    ),
};
```

**For multiple paths:**
```typescript
'new-icon-name': (
    <>
        <path d="M..." fill="currentColor" />
        <path d="M..." stroke="currentColor" strokeWidth={2} fill="none" />
    </>
),
```

### Step 4: Add to Available Icons List

Update the `availableIcons` array:

```typescript
export const availableIcons: IconName[] = [
    // ... existing icons
    'new-icon-name',
];
```

### Step 5: Test the Icon

```tsx
import { Icon } from '@shared/components';

function TestComponent() {
    return (
        <div>
            <Icon name="new-icon-name" size={24} />
            <Icon name="new-icon-name" size={32} color="var(--primary)" />
        </div>
    );
}
```

---

## Icon Design Guidelines

### Style Requirements (Aero-Minimalism)
- Use **stroke-based** icons (outline style)
- Stroke width: **2px**
- Rounded caps and joins
- Simple, clean shapes
- Consistent visual weight

### Color Usage
- Default: `currentColor` (inherits from parent text color)
- For colored icons: Use CSS custom properties
  ```tsx
  <Icon name="star" color="var(--secondary)" />
  <Icon name="check" color="var(--accent)" />
  ```

### Size Guidelines
| Context | Size |
|---------|------|
| Inline text | 16px |
| Buttons | 20px |
| Cards/Headers | 24px |
| Feature icons | 32px |
| Hero sections | 48px+ |

---

## Current Available Icons

| Icon Name | Usage |
|-----------|-------|
| `home` | Navigation, home page |
| `user` | Profile, account |
| `settings` | Settings, preferences |
| `game` | Games, play actions |
| `book` | Learning, courses |
| `trophy` | Achievements, rewards |
| `star` | Favorites, ratings |
| `check` | Success, completion |
| `close` | Dismiss, cancel |
| `arrow-right` | Navigation, CTAs |

---

## Usage Examples

### Basic Usage
```tsx
import { Icon } from '@shared/components';

<Icon name="home" />
<Icon name="user" size={32} />
<Icon name="star" color="var(--secondary)" />
```

### With Button
```tsx
<Button variant="primary">
    <Icon name="game" size={20} />
    Play Now
</Button>
```

### In Navigation
```tsx
<Link href="/home">
    <Icon name="home" size={20} />
    <span>Home</span>
</Link>
```

### Accessible Icon
```tsx
<Icon name="close" aria-label="Close dialog" />
```

---

## Checklist for New Icons

- [ ] Icon name added to `IconName` type
- [ ] SVG path data added to `iconPaths` object
- [ ] Icon name added to `availableIcons` array
- [ ] Icon uses `stroke="currentColor"` for theme support
- [ ] Icon uses strokeWidth={2} for consistency
- [ ] Icon tested in both light and dark themes
- [ ] Build passes: `npm run build`
