import { z } from 'zod';
import { router, protectedProcedure } from '../trpc';
import { db } from '../db';
import { TRPCError } from '@trpc/server';
import type { Context } from '../types/context';

async function requireProductAccess(ctx: Context, shopId: number): Promise<void> {
  if (!ctx.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You must be logged in',
    });
  }

  const role = await db
    .selectFrom('user_shop_roles')
    .select(['role'])
    .where('user_id', '=', ctx.user.id)
    .where('shop_id', '=', shopId)
    .executeTakeFirst();

  if (!role) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'You do not have access to this shop',
    });
  }
}

export const productRouter = router({
  create: protectedProcedure
    .input(
      z.object({
        shopId: z.number(),
        name: z.string().min(1).max(255),
        description: z.string().optional(),
        price: z.number().min(0).optional(),
        imageUrl: z.string().url().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await requireProductAccess(ctx, input.shopId);

      const product = await db
        .insertInto('products')
        .values({
          shop_id: input.shopId,
          name: input.name,
          description: input.description || null,
          price: input.price ? input.price.toFixed(2) : null,
          image_url: input.imageUrl || null,
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        })
        .returning([
          'id',
          'shop_id',
          'name',
          'description',
          'price',
          'image_url',
          'is_active',
          'created_at',
          'updated_at',
        ])
        .executeTakeFirstOrThrow();

      return product;
    }),

  list: protectedProcedure
    .input(
      z.object({
        shopId: z.number(),
        activeOnly: z.boolean().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      await requireProductAccess(ctx, input.shopId);

      let query = db
        .selectFrom('products')
        .selectAll()
        .where('shop_id', '=', input.shopId)
        .orderBy('created_at', 'desc');

      if (input.activeOnly) {
        query = query.where('is_active', '=', true);
      }

      const products = await query.execute();
      return products;
    }),

  get: protectedProcedure
    .input(z.object({ productId: z.number() }))
    .query(async ({ ctx, input }) => {
      const product = await db
        .selectFrom('products')
        .selectAll()
        .where('id', '=', input.productId)
        .executeTakeFirst();

      if (!product) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Product not found',
        });
      }

      await requireProductAccess(ctx, product.shop_id);
      return product;
    }),

  update: protectedProcedure
    .input(
      z.object({
        productId: z.number(),
        name: z.string().min(1).max(255).optional(),
        description: z.string().optional(),
        price: z.number().min(0).optional(),
        imageUrl: z.string().url().optional(),
        isActive: z.boolean().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const existing = await db
        .selectFrom('products')
        .select(['shop_id'])
        .where('id', '=', input.productId)
        .executeTakeFirst();

      if (!existing) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Product not found',
        });
      }

      await requireProductAccess(ctx, existing.shop_id);

      const updateData: any = {
        updated_at: new Date(),
      };

      if (input.name !== undefined) updateData.name = input.name;
      if (input.description !== undefined) updateData.description = input.description;
      if (input.price !== undefined) updateData.price = input.price.toFixed(2);
      if (input.imageUrl !== undefined) updateData.image_url = input.imageUrl;
      if (input.isActive !== undefined) updateData.is_active = input.isActive;

      const product = await db
        .updateTable('products')
        .set(updateData)
        .where('id', '=', input.productId)
        .returning([
          'id',
          'shop_id',
          'name',
          'description',
          'price',
          'image_url',
          'is_active',
          'created_at',
          'updated_at',
        ])
        .executeTakeFirstOrThrow();

      return product;
    }),

  delete: protectedProcedure
    .input(z.object({ productId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const existing = await db
        .selectFrom('products')
        .select(['shop_id'])
        .where('id', '=', input.productId)
        .executeTakeFirst();

      if (!existing) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Product not found',
        });
      }

      await requireProductAccess(ctx, existing.shop_id);

      await db
        .deleteFrom('products')
        .where('id', '=', input.productId)
        .execute();

      return { success: true };
    }),

  associateToChannel: protectedProcedure
    .input(
      z.object({
        productId: z.number(),
        channelId: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const product = await db
        .selectFrom('products')
        .select(['shop_id'])
        .where('id', '=', input.productId)
        .executeTakeFirst();

      if (!product) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Product not found',
        });
      }

      await requireProductAccess(ctx, product.shop_id);

      const channel = await db
        .selectFrom('channels')
        .select(['id'])
        .where('id', '=', input.channelId)
        .executeTakeFirst();

      if (!channel) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Channel not found',
        });
      }

      const existing = await db
        .selectFrom('channel_products')
        .select(['id'])
        .where('channel_id', '=', input.channelId)
        .where('product_id', '=', input.productId)
        .executeTakeFirst();

      if (existing) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'Product already associated with this channel',
        });
      }

      const association = await db
        .insertInto('channel_products')
        .values({
          channel_id: input.channelId,
          product_id: input.productId,
          created_at: new Date(),
        })
        .returning(['id', 'channel_id', 'product_id', 'created_at'])
        .executeTakeFirstOrThrow();

      return association;
    }),

  removeFromChannel: protectedProcedure
    .input(
      z.object({
        productId: z.number(),
        channelId: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const product = await db
        .selectFrom('products')
        .select(['shop_id'])
        .where('id', '=', input.productId)
        .executeTakeFirst();

      if (!product) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Product not found',
        });
      }

      await requireProductAccess(ctx, product.shop_id);

      await db
        .deleteFrom('channel_products')
        .where('channel_id', '=', input.channelId)
        .where('product_id', '=', input.productId)
        .execute();

      return { success: true };
    }),

  listByChannel: protectedProcedure
    .input(z.object({ channelId: z.number() }))
    .query(async ({ ctx, input }) => {
      const products = await db
        .selectFrom('channel_products')
        .innerJoin('products', 'products.id', 'channel_products.product_id')
        .innerJoin('shops', 'shops.id', 'products.shop_id')
        .select([
          'products.id',
          'products.shop_id',
          'products.name',
          'products.description',
          'products.price',
          'products.image_url',
          'products.is_active',
          'products.created_at',
          'products.updated_at',
          'shops.name as shop_name',
        ])
        .where('channel_products.channel_id', '=', input.channelId)
        .where('products.is_active', '=', true)
        .orderBy('products.created_at', 'desc')
        .execute();

      return products;
    }),
});
