import 'emoji-log';
import {browser} from 'webextension-polyfill-ts';
import DashService from './services/DashService';
import MESSAGES from './messages';

type Message = {
  type: string;
  payload: unknown;
};

type Services = {
  dashService?: DashService;
};

const services: Services = {};

browser.runtime.onInstalled.addListener((): void => {
  console.emoji('🦄', 'extension installed11');
});

browser.runtime.onMessage.addListener((message: Message): void => {
  if (message.type === MESSAGES.INIT) {
    services.dashService = new DashService();
  }
});
