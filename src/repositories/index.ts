/**
 * Repository layer exports - Spring Data JPA style
 * 
 * Each repository is a class with named query methods.
 * Methods use Kysely query builder (similar to JPQL/Criteria API)
 * 
 * Example usage:
 * ```typescript
 * const user = await userRepository.findByEmail('user@example.com');
 * const newUser = await userRepository.save('email', 'password');
 * ```
 */

// Repository instances
export { userRepository } from './UserRepository';

// More repositories will be added in later phases:
// export { shopRepository } from './ShopRepository';
// export { productRepository } from './ProductRepository';
