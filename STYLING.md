# Design System Guidelines

## Philosophy
- **Mobile First**: Design for mobile, enhance for desktop
- **Shadcn First**: Use components from `client/src/components/ui/`
- **Accessibility**: Built-in keyboard navigation, screen readers, ARIA
- **Type-Safe**: Full TypeScript support

---

## Core Stack

### Shadcn UI
- **Docs**: https://ui.shadcn.com/
- **Location**: `client/src/components/ui/`
- **Add components**: `npx shadcn@latest add [component-name]`

### Tailwind CSS
- **Docs**: https://tailwindcss.com/docs
- **Mobile-first breakpoints**: `sm:640px md:768px lg:1024px xl:1280px 2xl:1536px`
- **Utility-first**: Apply classes directly in JSX, never use CSS modules

### Lucide Icons
- **Docs**: https://lucide.dev/
- **Import**: `import { IconName } from 'lucide-react'`
- **Sizes**: `size-4` (default), `size-5` (buttons), `size-6` (large)

### Sonner Toasts
- **Usage**: `toast.success()`, `toast.error()`, `toast.info()`, `toast.warning()`

---

## Component Usage

### Finding Components
1. Check `client/src/components/ui/` first
2. If not found, visit https://ui.shadcn.com/
3. Install with `npx shadcn@latest add [component-name]`

### Common Components
```tsx
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { IconName } from 'lucide-react';

// Button variants: default, destructive, outline, secondary, ghost, link
// Button sizes: sm, default, lg, icon
<Button variant="default" size="lg">
  <IconName className="size-5 mr-2" />
  Action
</Button>

// Icons
<IconName className="size-4" /> // Default 16px
<IconName className="size-5" /> // Buttons 20px
<IconName className="size-6" /> // Large 24px

// Accessibility
<Button size="icon" aria-label="Settings">
  <Settings className="size-4" />
</Button>
```

---

## Styling

### Mobile-First Responsive
```tsx
// ✅ DO: Mobile first, enhance for desktop
<div className="flex-col md:flex-row">
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
<div className="text-sm md:text-base lg:text-lg">

// ❌ DON'T: Desktop first
<div className="flex-row md:flex-col">
```

### Conditional Classes
```tsx
import { cn } from '@/lib/utils';

<Button className={cn(
  "px-4 py-2",
  isActive && "bg-indigo-500",
  isDisabled && "opacity-50"
)} />
```

### Common Patterns
```tsx
// Layout
className="flex items-center justify-between gap-4"
className="grid grid-cols-1 md:grid-cols-2 gap-6"
className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"

// Spacing
className="p-4 px-6 py-4 mt-8 mb-4 gap-4"

// Colors (use design tokens)
className="bg-primary text-primary-foreground"
className="bg-secondary text-secondary-foreground"
className="bg-destructive text-destructive-foreground"
className="border border-border"

// Typography
className="text-xl font-semibold"

// Shadows & Borders
className="shadow-md rounded-xl"
```

### Component Structure
```
ComponentName/
├── ComponentName.tsx    # Logic + Tailwind classes
└── index.ts            # Re-export
```

**Never use CSS modules**

---

## Resources

- Shadcn: https://ui.shadcn.com/
- Tailwind: https://tailwindcss.com/docs
- Lucide: https://lucide.dev/
- Sonner: https://github.com/emilkowalski/sonner

**Last Updated**: 2025-12-23
