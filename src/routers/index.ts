import { router } from '../trpc';
import { authRouter } from './auth';
import { channelRouter } from './channel';
import { shopRouter } from './shop';

export const appRouter = router({
  auth: authRouter,
  channel: channelRouter,
  shop: shopRouter,
});

export type AppRouter = typeof appRouter;
