import * as Msal from 'msal';

const { ClientId } = (window as any);

const config = {
  auth: {
    clientId: ClientId,
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: true,
  },
};

export const app = new Msal.UserAgentApplication((config as any));
