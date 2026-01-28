---
description: How to write and run unit tests for the web application using Jest and React Testing Library.
---

# Testing Guide for Chill Code Learn Web

This guide explains how to write and run unit tests for React components and shared logic in the `/web` directory.

## 1. Running Tests

- **Run all tests**: `npm test`
- **Watch mode**: `npm run test:watch`
- **Run specific test file**: `npx jest path/to/file.test.tsx`

## 2. Writing Unit Tests

### Test File Location
Place tests in a `__tests__` directory relative to the component or logic being tested.
Example: `src/shared/components/Button/__tests__/Button.test.tsx`

### Basic Component Test Structure
```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { MyComponent } from '../MyComponent';

describe('MyComponent', () => {
    it('should render correctly', () => {
        render(<MyComponent label="Test" />);
        expect(screen.getByText('Test')).toBeInTheDocument();
    });

    it('should handle interactions', () => {
        const handleClick = jest.fn();
        render(<MyComponent onClick={handleClick} />);
        
        fireEvent.click(screen.getByRole('button'));
        expect(handleClick).toHaveBeenCalled();
    });
});
```

### Mocking Next.js Features
If your component uses `next/link`, `next/image`, or `next/navigation`, you should mock them:

```tsx
// Mocking Link
jest.mock('next/link', () => {
    return ({ children, href }: { children: React.ReactNode; href: string }) => {
        return <a href={href}>{children}</a>;
    };
});

// Mocking Navigation
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
    usePathname: () => '/',
}));
```

### Module Aliases
The project uses aliases like `@/*` and `@shared/*`. These are already configured in `jest.config.ts`. If you add new aliases in `tsconfig.json`, remember to update `jest.config.ts`'s `moduleNameMapper`.

## 3. Best Practices
- **Test behavior, not implementation**: Focus on what the user sees and interacts with.
- **Use `screen`**: Prefer `screen.getBy...` and `screen.queryBy...` over destructured render results.
- **Cleanup**: `next/jest` handles environment cleanup automatically.
- **Accessibility**: Use `getByRole` whenever possible to ensure your components are accessible.
