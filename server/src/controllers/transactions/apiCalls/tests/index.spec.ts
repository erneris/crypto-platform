import { getCoinBySymbol, getCoins } from '..';

it('should return a object with coins', async () => {
  const coins = await getCoins();
  expect(coins.length).toBeGreaterThan(10);
});

it('should return a coin', async () => {
  const coin = await getCoinBySymbol('BTC');
  expect(coin).toHaveProperty('id');
});
