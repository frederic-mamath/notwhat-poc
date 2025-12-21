# Styling Guide

## Overview
This project uses **Tailwind CSS** with **Shadcn/ui** components for all styling. CSS Modules have been completely removed.

## Configuration

### Tailwind Config
- Located in: `client/tailwind.config.js`
- Includes Shadcn theme tokens and custom colors
- Content paths: `./src/**/*.{ts,tsx}` and `./index.html`

### PostCSS Config
- Located in: `client/postcss.config.js`
- Uses `@tailwindcss/postcss` plugin (v4)
- Includes `autoprefixer`

### Vite Config
- Located in: `vite.config.ts`
- Root set to `./client`
- **CSS modules explicitly disabled**: `css.modules: false`

## Best Practices

### 1. Use Tailwind Utility Classes
```tsx
// ✅ Correct
<div className="flex items-center gap-4 p-4 bg-background">
  <h1 className="text-2xl font-bold">Title</h1>
</div>
```

### 2. Use Shadcn Components
```tsx
// ✅ Correct
import { Button } from '@/components/ui/button';

<Button variant="default" size="lg">Click Me</Button>
```

### 3. Use cn() Utility for Conditional Classes
```tsx
// ✅ Correct
import { cn } from '@/lib/utils';

<div className={cn(
  "base-class",
  isActive && "active-class",
  variant === "primary" && "primary-class"
)}>
  Content
</div>
```

### 4. NO CSS Modules
```tsx
// ❌ Wrong - CSS modules are disabled
import styles from './Component.module.scss';

// ✅ Correct - Use Tailwind directly
<div className="my-custom-class">
```

## Component Structure

Components should follow this structure:

```
ComponentName/
├── ComponentName.tsx        # Component logic
└── index.ts                 # Export
```

## Styling Tokens

All design tokens are defined in `client/src/index.css`:
- Colors: `--background`, `--foreground`, `--primary`, etc.
- Spacing: Use Tailwind spacing scale
- Border radius: `--radius` variable

## Migration Complete

✅ All CSS modules have been removed
✅ All components use Tailwind CSS
✅ Shadcn/ui components used throughout
✅ No styling warnings or errors

## Related Files
- `/dev-quality/001-css-modules-to-tailwind/` - Migration documentation
- `GEMINI.md` - Design consistency guidelines
