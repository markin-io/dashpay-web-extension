import 'emoji-log';
import {browser} from 'webextension-polyfill-ts';
import DashService from './services/DashService';
import MESSAGES from './messages';
import QuotesService from './services/QuotesService';
import {
  DASH_SERVICE_MESSAGES,
  QUOTES_SERVICE_MESSAGES,
} from './services/messages';

type Message = {
  type: string;
  payload: unknown;
};

type Services = {
  dashService?: DashService;
  quotesService?: QuotesService;
};

const services: Services = {};
let initialized = false;

browser.runtime.onInstalled.addListener((): void => {
  console.emoji('🦄', 'extension installed11');
});

const messageHandler = async (message: Message): Promise<unknown> => {
  if (!initialized) {
    if (message.type === MESSAGES.INIT) {
      services.dashService = new DashService();
      services.quotesService = QuotesService.getInstance();
      initialized = true;
    }

    return true;
  }

  if (message.type in DASH_SERVICE_MESSAGES) {
    return services.dashService?.handleMessage(message);
  }

  if (message.type in QUOTES_SERVICE_MESSAGES) {
    return services.quotesService?.handleMessage(message);
  }
  return true;
};

browser.runtime.onMessage.addListener(messageHandler);
