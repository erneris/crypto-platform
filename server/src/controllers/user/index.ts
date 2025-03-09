import { router } from '@server/trpc';
import login from './login';
import signup from './signup';
import getData from './getData';
import changePassword from './changePassword';
import getTransactions from './getTransactions';
import getAssets from './getAssets';

export default router({
  login,
  signup,
  getData,
  changePassword,
  getTransactions,
  getAssets,
});
