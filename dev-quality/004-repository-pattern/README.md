# Repository Pattern - Spring Data JPA Style

## Overview

This track implements a **Spring Data JPA inspired** repository pattern for WhyNot project. Instead of writing database queries directly in routers, we create repository classes with named query methods.

## Key Principles

### 1. Named Query Methods
Methods follow Spring Data naming conventions:
- `findById()`, `findByEmail()`, `findAll()`
- `existsByEmail()`, `existsById()`
- `save()` - create or update
- `deleteById()`
- `count()`

### 2. Explicit SQL with Kysely
Each method contains the actual Kysely query, so you see exactly what SQL runs:

```typescript
async findByEmail(email: string): Promise<User | undefined> {
  // SQL: SELECT * FROM users WHERE email = ?
  return db
    .selectFrom('users')
    .selectAll()
    .where('email', '=', email)
    .executeTakeFirst();
}
```

### 3. Simple Classes (No Inheritance)
No complex base classes - just simple TypeScript classes:

```typescript
export class UserRepository {
  async findById(id: number) { ... }
  async save(...) { ... }
}

export const userRepository = new UserRepository();
```

### 4. Singleton Instances
Export singleton instances like Spring `@Repository` beans:

```typescript
// In repository file
export const userRepository = new UserRepository();

// In router
import { userRepository } from '../repositories';
const user = await userRepository.findByEmail(email);
```

## Comparison with Spring Boot JPA

| Spring Boot JPA | WhyNot Repository |
|-----------------|-------------------|
| `@Repository` annotation | Export singleton instance |
| `findById(Long id)` | `findById(id: number)` |
| `findByEmail(String email)` | `findByEmail(email: string)` |
| `existsByEmail(String email)` | `existsByEmail(email: string)` |
| `save(User user)` | `save(email, password, ...)` |
| `deleteById(Long id)` | `deleteById(id: number)` |
| JPQL/Criteria API | Kysely query builder |

## Benefits

✅ **Clear method names** - Know what the method does immediately
✅ **Explicit SQL** - See the exact query in each method
✅ **Type-safe** - Full TypeScript typing from Kysely
✅ **No inheritance complexity** - Simple classes
✅ **Easy to test** - Mock repository instances
✅ **Familiar pattern** - Spring developers feel at home

## Current Implementation

### Phase 1: ✅ UserRepository (Complete)
- Created `UserRepository` with 10 methods
- Follows Spring naming conventions
- All methods documented with SQL equivalents
- TypeScript compiles successfully
- Ready for auth.ts router refactoring

### Next: Phase 2
- ShopRepository
- UserShopRoleRepository
- Refactor shop.ts router

## Usage Example

```typescript
// Before (in router)
const existingUser = await db
  .selectFrom('users')
  .select(['id'])
  .where('email', '=', input.email)
  .executeTakeFirst();

if (existingUser) {
  throw new TRPCError({ code: 'CONFLICT' });
}

// After (with repository)
const emailExists = await userRepository.existsByEmail(input.email);
if (emailExists) {
  throw new TRPCError({ code: 'CONFLICT' });
}
```

Much cleaner and easier to understand!
