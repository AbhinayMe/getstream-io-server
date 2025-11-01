# Code Style Guide

This document outlines the coding standards for GetStream.io Server.

## TypeScript Standards

### File Organization

```typescript
// 1. Imports - External first, then internal
import express from 'express';
import { StreamClient } from '@stream-io/node-sdk';

import { streamClient } from '../config/stream';
import { TokenRequest } from '../types';

// 2. Type/Interface definitions
interface UserData {
  id: string;
  name: string;
}

// 3. Constants
const DEFAULT_TOKEN_VALIDITY = 3600;

// 4. Functions/Classes
export class UserController {
  // Implementation
}
```

### Naming Conventions

**Files:**

- Use camelCase: `userController.ts`, `tokenRoutes.ts`
- Controllers: `*Controller.ts`
- Routes: `*Routes.ts`
- Types: `types/index.ts`

**Variables/Functions:**

```typescript
// Use camelCase for variables and functions
const userName = 'John';
function getUserById(id: string) { }

// Use PascalCase for classes and interfaces
class UserController { }
interface TokenRequest { }

// Use UPPER_CASE for constants
const MAX_PARTICIPANTS = 100;
```

### Type Safety

**Always use types:**

```typescript
// ✅ Good
function createUser(data: UserData): Promise<User> {
  return streamClient.upsertUsers([data]);
}

// ❌ Bad
function createUser(data: any): any {
  return streamClient.upsertUsers([data]);
}
```

**Avoid `any`:**

```typescript
// ✅ Good
interface RequestBody {
  userId: string;
  validity?: number;
}

// ❌ Bad
let data: any;
```

### Async/Await

**Use async/await instead of promises:**

```typescript
// ✅ Good
async function getUser(id: string): Promise<User> {
  try {
    const user = await streamClient.getUser(id);
    return user;
  } catch (error) {
    throw new Error('User not found');
  }
}

// ❌ Bad
function getUser(id: string): Promise<User> {
  return streamClient.getUser(id)
    .then(user => user)
    .catch(err => { throw err; });
}
```

### Error Handling

**Always handle errors properly:**

```typescript
// ✅ Good
try {
  const result = await operation();
  return res.json(result);
} catch (error) {
  console.error('Operation failed:', error);
  return res.status(500).json({ 
    error: 'Operation failed' 
  });
}

// ❌ Bad
const result = await operation();
return res.json(result);
```

### Function Comments

**Use JSDoc for public functions:**

```typescript
/**
 * Generate authentication token for a user
 * @param userId - User identifier
 * @param validity - Token validity in seconds (default: 3600)
 * @returns User authentication token
 */
async function generateUserToken(
  userId: string, 
  validity: number = 3600
): Promise<string> {
  return streamClient.generateUserToken(userId, validity);
}
```

## Express.js Conventions

### Route Handlers

```typescript
// Use async/await in route handlers
router.post('/users', async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const user = await createUser(userData);
    return res.status(201).json({ user });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create user' });
  }
});
```

### Middleware

```typescript
// Export middleware functions
export const validateToken = (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};
```

## Best Practices

1. **Keep functions small** - Single responsibility principle
2. **Use meaningful names** - Self-documenting code
3. **Avoid magic numbers** - Use named constants
4. **Write tests** - For critical functionality
5. **Handle edge cases** - Check for null/undefined
6. **Log errors** - Use console.error for debugging
7. **Validate input** - Use express-validator
8. **Return early** - Reduce nesting

## Code Review Checklist

- [ ] No `any` types used
- [ ] Error handling in place
- [ ] TypeScript strict mode passes
- [ ] Follows naming conventions
- [ ] Functions are documented
- [ ] No console.log (use console.error for errors)
- [ ] Input validation added
- [ ] Consistent formatting
