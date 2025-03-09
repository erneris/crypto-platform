import { router } from '@server/trpc';
import getCoin from './getCoin';
import getCoins from './getCoins';
import buyCoin from './buyCoin';
import sellCoin from './sellCoin';

export default router({
  getCoin,
  getCoins,
  buyCoin,
  sellCoin,
});
