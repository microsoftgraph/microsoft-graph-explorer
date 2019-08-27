import * as Msal from 'msal';
import { collectLogs } from './auth.service';

const { ClientId } = (window as any);

const loggerCallback = (level: Msal.LogLevel, message: string): void => {
  collectLogs(message);
};

const logger = new Msal.Logger(loggerCallback, { level: Msal.LogLevel.Error, correlationId: '1234' });

const config: Msal.Configuration = {
  auth: {
    clientId: ClientId,
    navigateToLoginRequestUrl: false,
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: true,
  },
  system: {
    logger,
  },
};

export const app = new Msal.UserAgentApplication((config as any));
