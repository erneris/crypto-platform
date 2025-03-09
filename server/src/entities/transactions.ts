import { z } from 'zod';

export const cryptoSymbol = z.object({
  symbol: z.string().trim().toUpperCase(),
});

export const cryptoSymbolWithAmmount = z.object({
  symbol: z.string().trim().toUpperCase(),
  ammount: z.number().positive().step(0.0001),
});

export const apiReturn = z.object({
  id: z.string(),
  name: z.string(),
  symbol: z.string(),
  rank: z.number(),
  total_supply: z.number(),
  max_supply: z.number(),
  beta_value: z.number(),
  first_data_at: z.string(),
  last_updated: z.string(),
  quotes: z.object({
    USD: z.object({
      price: z.number(),
      volume_24h: z.number(),
      volume_24h_change_24h: z.number(),
      market_cap: z.number(),
      market_cap_change_24h: z.number(),
      percent_change_15m: z.number(),
      percent_change_30m: z.number(),
      percent_change_1h: z.number(),
      percent_change_6h: z.number(),
      percent_change_12h: z.number(),
      percent_change_24h: z.number(),
      percent_change_7d: z.number(),
      percent_change_30d: z.number(),
      percent_change_1y: z.number(),
      ath_price: z.number(),
      ath_date: z.string(),
      percent_from_price_ath: z.number(),
    }),
  }),
});

export const apiReturns = z.array(apiReturn);
