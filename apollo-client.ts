import {
  ApolloClient,
  concat,
  gql,
  HttpLink,
  InMemoryCache,
  makeVar,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = new HttpLink({ uri: process.env.NEXT_PUBLIC_GRAPHQL_URL });

const authLink = setContext(async (_: any, { headers }) => {
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
  connectToDevTools: false,
  ssrMode: true,
});

export default client;
