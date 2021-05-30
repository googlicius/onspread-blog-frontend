import { ApolloClient, HttpLink, InMemoryCache, concat } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries';
import { sha256 } from 'crypto-hash';

const httpLink = new HttpLink({ uri: process.env.NEXT_PUBLIC_GRAPHQL_URL });
const linkChain = createPersistedQueryLink({ sha256 }).concat(httpLink);

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
  link: concat(authLink, linkChain),
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  cache,
  connectToDevTools: process.env.NODE_ENV !== 'production',
  ssrMode: false,
});

export default client;
