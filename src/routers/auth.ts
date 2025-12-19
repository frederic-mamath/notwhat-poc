import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import { db } from '../db';
import { hashPassword, verifyPassword, generateToken } from '../utils/auth';
import { TRPCError } from '@trpc/server';

export const authRouter = router({
  register: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(6),
      })
    )
    .mutation(async ({ input }) => {
      // Check if user exists
      const existingUser = await db
        .selectFrom('users')
        .selectAll()
        .where('email', '=', input.email)
        .executeTakeFirst();

      if (existingUser) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'Email already registered',
        });
      }

      const hashedPassword = await hashPassword(input.password);

      // Insert user
      const user = await db
        .insertInto('users')
        .values({
          email: input.email,
          password: hashedPassword,
          is_verified: false,
          created_at: new Date(),
          updated_at: new Date(),
        })
        .returningAll()
        .executeTakeFirstOrThrow();

      const token = generateToken(user.id);

      return {
        user: {
          id: user.id,
          email: user.email,
          isVerified: user.is_verified,
        },
        token,
      };
    }),

  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const user = await db
        .selectFrom('users')
        .selectAll()
        .where('email', '=', input.email)
        .executeTakeFirst();

      if (!user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Invalid email or password',
        });
      }

      const isValidPassword = await verifyPassword(input.password, user.password);

      if (!isValidPassword) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Invalid email or password',
        });
      }

      const token = generateToken(user.id);

      return {
        user: {
          id: user.id,
          email: user.email,
          isVerified: user.is_verified,
        },
        token,
      };
    }),

  me: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.userId) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Not authenticated',
      });
    }

    const user = await db
      .selectFrom('users')
      .selectAll()
      .where('id', '=', ctx.userId)
      .executeTakeFirst();

    if (!user) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'User not found',
      });
    }

    return {
      id: user.id,
      email: user.email,
      isVerified: user.is_verified,
      createdAt: user.created_at,
    };
  }),
});
