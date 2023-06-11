import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  type NormalizedCacheObject,
} from '@apollo/client';
import merge from 'deepmerge';
import isEqual from 'lodash-es/isEqual';
import { setContext } from '@apollo/client/link/context';
import { useAuth } from '8base-react-sdk';

const CONT_API = 'https://api.8base.com/clinb11sb000g08mp4x3gay7q';
// const CONT_API = 'https://countries.trevorblades.com';

// Crea un enlace HTTP
export const httpLink = createHttpLink({
  uri: CONT_API,
});

// Función para agregar el token de autenticación a los headers
const authLink = setContext((_, { headers }) => {
  // Declare variable to store authToken
  console.log('aaaaaaaa: ');
  
  let token = '';

  // Devuelve los headers con el token incluido
  const headersConst = {headers: {
    ...headers,
    Authorization: token ? `Bearer ${token}` : '',
  }};
  console.log('headersConst: ', headersConst);

  return headersConst;
});

// Función para agregar el token de autenticación a los headers
export const setAuthToken = (token: string) => setContext((_, { headers }) => {
  // Declare variable to store authToken
  console.log('tokenaa: ', token);
  
  // Devuelve los headers con el token incluido
  const headersConst = {headers: {
    ...headers,
    Authorization: token ? `Bearer ${token}` : '',
  }};
  console.log('headersConst: ', headersConst);

  return headersConst;
});

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient: ApolloClient<NormalizedCacheObject> | null;

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: authLink.concat(httpLink),
    // uri: CONT_API,
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState?: any) {
  const _apolloClient = apolloClient ?? createApolloClient();

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

  if (typeof window === 'undefined') {
    return _apolloClient;
  }

  if (!apolloClient) {
    apolloClient = _apolloClient;
  }

  return _apolloClient;
}

export function addApolloState(
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: any
) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}
