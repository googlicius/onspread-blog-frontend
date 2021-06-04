import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  concat,
  ApolloLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries';
import { sha256 } from 'crypto-hash';

let httpLink: ApolloLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
});

if (process.env.NEXT_PUBLIC_PERSISTED_LINK_DISABLED !== 'true') {
  httpLink = createPersistedQueryLink({ sha256 }).concat(httpLink);
}

const authLink = setContext(async (_, { headers }) => {
  const jwtToken =
    typeof window !== 'undefined' &&
    localStorage.getItem(process.env.NEXT_PUBLIC_JWT_TOKEN_KEY);

  return {
    headers: {
      ...headers,
      Authorization: jwtToken ? `Bearer ${jwtToken}` : '',
    },
  };
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: concat(authLink, httpLink),
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  cache,
  connectToDevTools: process.env.NODE_ENV !== 'production',
  ssrMode: false,
});

export default client;
