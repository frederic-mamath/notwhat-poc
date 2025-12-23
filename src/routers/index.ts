import { router } from '../trpc';
import { authRouter } from './auth';
import { channelRouter } from './channel';
import { shopRouter } from './shop';
import { productRouter } from './product';
import { vendorPromotionRouter } from './vendorPromotion';

export const appRouter = router({
  auth: authRouter,
  channel: channelRouter,
  shop: shopRouter,
  product: productRouter,
  vendorPromotion: vendorPromotionRouter,
});

export type AppRouter = typeof appRouter;
