# GitHub Copilot Instructions for NotWhat Project

## Context Files

Always include these files in your context when working on this project:

- `STYLING.md` - Complete styling guide with Shadcn UI and Tailwind CSS conventions
- `ARCHITECTURE.md` - System architecture and project structure
- `README.md` - Project overview and setup instructions

## Project Overview

This is a **live video/audio streaming platform** built with:
- **Backend**: Express + tRPC + PostgreSQL (port 3000)
- **Frontend**: React 19 + Vite (port 5173)
- **UI/Styling**: Shadcn UI + Tailwind CSS v4
- **Video**: Agora RTC SDK

## Design System Rules

1. **Always use Shadcn components** - Never create custom buttons, inputs, etc.
2. **Use Tailwind utilities** - No inline styles, no CSS modules
3. **Follow design tokens** - Use `bg-primary`, `text-foreground`, etc. (not `bg-blue-500`)
4. **Use the `cn()` utility** - For merging Tailwind classes
5. **Mobile-first responsive** - Use `md:` and `lg:` breakpoints

## Component Structure

All UI components go in: `client/src/components/ui/ComponentName/`
```
ComponentName/
├── ComponentName.tsx
└── index.ts
```

## Key Conventions

- **Server runs on port 3000** (`npm run dev`)
- **Client runs on port 5173** (`npm run dev:client`)
- **DO NOT run npm commands** without asking first (it can break the user's environment)
- **Check STYLING.md** before creating any UI components
- **Use TypeScript** for all code
- **Follow the existing patterns** in the codebase

## When Creating Components

1. Check if a Shadcn component exists first
2. If yes, use it (see STYLING.md for usage)
3. If no, create it following Shadcn patterns
4. Update STYLING.md with the new component documentation

## Important

- The user has manually configured Tailwind and Shadcn
- Don't modify `index.css`, `tailwind.config.js`, or `vite.config.ts` without discussion
- Always maintain design consistency (reference STYLING.md)
