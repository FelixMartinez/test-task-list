import { Auth, AUTH_STRATEGIES } from '@8base/auth';

const authClient = Auth.createClient({
  strategy: AUTH_STRATEGIES.WEB_8BASE,
  subscribable: true,
  clientID: process.env.REACT_APP_AUTH_CLIENT_ID,
  domain: process.env.REACT_APP_AUTH_DOMAIN,
});

export default authClient;
