import { useMemo } from 'react';
import { APOLLO_STATE_PROP_NAME, initializeApollo } from '../shared/apollo';

//configure apollo
const useApollo = (pageProps: any) => {
  // Get the state of the Apollo client from the `pageProps` object
  const state = pageProps[APOLLO_STATE_PROP_NAME];

  // Initialize the Apollo client using the state
  const client = useMemo(() => initializeApollo(state), [state]);

  // Returns the Apollo client
  return client;
}

export default useApollo;
