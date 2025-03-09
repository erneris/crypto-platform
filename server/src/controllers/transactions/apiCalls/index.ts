import { apiReturns } from '@server/entities/transactions';

const apiUrl = 'https://api.coinpaprika.com/v1/';

export async function getCoinBySymbol(symbol: string) {
  const data = await getCoins();
  const result = data.filter(coin => coin.symbol === symbol);
  if (result.length < 1) {
    throw new Error('No coins with this symbol was found.');
  }
  return result[0];
}

export async function getCoins() {
  const url = apiUrl + `tickers/`;
  let data;
  try {
    const response = await fetch(url);
    data = await response.json();
    const dataParsed = apiReturns.parse(data);
    if (typeof data != 'object' || data === null || !Array.isArray(data)) {
      throw new Error();
    }
    return dataParsed;
  } catch (e) {
    console.log(e);
    throw new Error(
      `Something went wrong while getting API request. Please try again later. ${e}`
    );
  }
}
