import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  type NormalizedCacheObject,
} from '@apollo/client';
import merge from 'deepmerge';
import isEqual from 'lodash-es/isEqual';
import { setContext } from '@apollo/client/link/context';

// Get the API endpoint safely from the environment variable
const CONT_API = process.env.NEXT_PUBLIC_APP_WORKSPACE_ENDPOINT;

// Name of the property to store the Apollo state in the page props
export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

// Variable to store the Apollo client instance
let apolloClient: ApolloClient<NormalizedCacheObject> | null;

// Create an HTTP binding for connection to the GraphQL API
export const httpLink = createHttpLink({
  uri: CONT_API,
});

// Function to add the authentication token to the request headers
const authLink = setContext((_, { headers }) => {
  // Declare variable to store authToken
  let token = '';

  // Return the headers with the token included
  const headersConst = {headers: {
    ...headers,
    Authorization: token ? `Bearer ${token}` : '',
  }};

  return headersConst;
});

// Function to set the authentication token in the request headers
export const setAuthToken = (token: string) => setContext((_, { headers }) => {
  // Return the headers with the token included
  const headersConst = {headers: {
    ...headers,
    Authorization: token ? `Bearer ${token}` : '',
  }};

  return headersConst;
});

// Function to create an instance of the Apollo client
export const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined', // SSR (Server-Side Rendering) mode
    link: authLink.concat(httpLink), // Combine the authentication binding with the HTTP binding
    cache: new InMemoryCache(), // Cache instance in memory
  });
}

// Initialize the Apollo client instance and restore state if available
export function initializeApollo(initialState?: any) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // Restore initial state if available
  if (initialState) {
    const existingCache = _apolloClient.cache.extract();

    const data = merge(initialState, existingCache, {
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    });
    _apolloClient.cache.restore(data);
  }

  // For SSR, return the Apollo client instance
  if (typeof window === 'undefined') {
    return _apolloClient;
  }

  // For CSR, initialize the instance globally to avoid creating multiple instances
  if (!apolloClient) {
    apolloClient = _apolloClient;
  }

  return _apolloClient;
}

// Add Apollo status to page props
export function addApolloState(
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: any
) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}
