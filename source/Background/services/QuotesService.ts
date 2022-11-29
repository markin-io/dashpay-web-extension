import {browser} from 'webextension-polyfill-ts';
import {Message} from './types';
import {QUOTES_SERVICE_MESSAGES} from './messages';

export const QUOTES_FETCHING_INTERVAL = 600000;

export const QUOTES_API_URLS = [
  'https://www.dashcentral.org/api/v1/public',
  'https://rates2.dashretail.org/rates?source=dashretail&symbol=DASHUSD',
  'https://min-api.cryptocompare.com/data/generateAvg?fsym=DASH&tsym=USD&e=Binance,Kraken,Poloniex,Bitfinex',
];

class QuotesService {
  private static instance: QuotesService;

  static MESSAGES = QUOTES_SERVICE_MESSAGES;

  private dashUsdRate = 0;

  private initialized = false;

  constructor() {
    this.init();
  }

  public static getInstance(): QuotesService {
    if (!QuotesService.instance) {
      QuotesService.instance = new QuotesService();
    }

    return QuotesService.instance;
  }

  public getDashUsdRate(): number {
    return this.dashUsdRate;
  }

  public init(): void {
    if (!this.initialized) {
      this.fetchQuotes().then(() => {
        setInterval(() => this.fetchQuotes(), QUOTES_FETCHING_INTERVAL);
        this.initialized = true;
      });
    }
  }

  async fetchQuotes(): Promise<void> {
    for (let i = 0; i < QUOTES_API_URLS.length; i += 1) {
      try {
        const response = await fetch(QUOTES_API_URLS[i]);
        if (response.ok) {
          const data = await response.json();
          const result = this.formatResponse(data, i);
          this.dashUsdRate = result;
          await browser.runtime.sendMessage({
            type: QUOTES_SERVICE_MESSAGES.DASH_USD_RATE_UPDATED,
            payload: result,
          });
          break;
        }
      } catch (e) {
        console.error(e);
      }
    }
  }

  formatResponse(
    data: Record<string, Record<string, number>>,
    index: number
  ): number {
    switch (index) {
      case 0:
        return data?.exchange_rates?.dash_usd;
      case 1:
        return data[0]?.price;
      case 2:
        return data?.RAW?.PRICE;
      default:
        return 0;
    }
  }

  async handleMessage(message: Message): Promise<unknown> {
    switch (message.type) {
      case QuotesService.MESSAGES.GET_DASH_USD_RATE:
        return this.getDashUsdRate();
      default:
        break;
    }

    return true;
  }
}

export default QuotesService;
