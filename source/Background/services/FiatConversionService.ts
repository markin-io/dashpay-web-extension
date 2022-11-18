import {browser} from 'webextension-polyfill-ts';
import DASH_SERVICE_MESSAGE from './messages';
import {firstOf} from './utils';
import {RATE_URLS, TEN_MINUTES} from './constants';

class FiatConversionService {
  private static instance: FiatConversionService;

  private usdRate = 0;

  private init = false;

  constructor() {
    this.fetchRate = this.fetchRate.bind(this);
  }

  public static getInstance(): FiatConversionService {
    if (!FiatConversionService.instance) {
      FiatConversionService.instance = new FiatConversionService();
    }

    return FiatConversionService.instance;
  }

  public getUsdConversationRate(): number {
    return this.usdRate;
  }

  public initConversationRate(): void {
    if (!this.init) {
      this.fetchRate()
        .then(() => {
          setInterval(() => this.fetchRate(), TEN_MINUTES);
          this.init = true;
        })
        .catch((e) => console.error(e));
    }
  }

  async fetchRate(): Promise<void> {
    try {
      const response = await fetch(RATE_URLS.primary);
      const {exchange_rates: {dash_usd: dashUsd = 0} = {}} =
        await response.json();
      this.usdRate = dashUsd;
      await browser.runtime.sendMessage({
        type: DASH_SERVICE_MESSAGE.FIAT_CONVERSION_RATE_UPDATED,
        payload: dashUsd,
      });
    } catch (e) {
      console.log(`url ${RATE_URLS.primary} is not available`);
      await this.fetchAnotherUrls();
    }
  }

  async fetchAnotherUrls(): Promise<void> {
    const response = await firstOf(
      RATE_URLS.fallbacks.map((url) => fetch(url))
    );
    console.log(`fetch data from ${response.url}`);
    const result = await response.json();
    this.usdRate = this.formatResponse(result);
    await browser.runtime.sendMessage({
      type: DASH_SERVICE_MESSAGE.FIAT_CONVERSION_RATE_UPDATED,
      payload: this.formatResponse(result),
    });
  }

  formatResponse(
    data: Record<string, Record<string, number>> | Record<string, number>[]
  ): number {
    if (Array.isArray(data)) {
      return data[0]?.price;
    }
    return data?.RAW?.PRICE;
  }
}

export default FiatConversionService;
