import * as Msal from 'msal';

const { ClientId } = (window as any);

const config: Msal.Configuration = {
  auth: {
    clientId: ClientId,
    navigateToLoginRequestUrl: false,
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: true,
  },
};

export const app = new Msal.UserAgentApplication((config as any));
