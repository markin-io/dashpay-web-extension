export const TEN_MINUTES = 600000;

export const RATE_URLS = {
  primary: 'https://www.dashcentral.org/api/v1/public',
  fallbacks: [
    'https://rates2.dashretail.org/rates?source=dashretail&symbol=DASHUSD',
    'https://min-api.cryptocompare.com/data/generateAvg?fsym=DASH&tsym=USD&e=Binance,Kraken,Poloniex,Bitfinex',
  ],
};
