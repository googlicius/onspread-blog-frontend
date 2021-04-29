import { ApolloClient, concat, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = new HttpLink({ uri: process.env.NEXT_PUBLIC_GRAPHQL_URL });

const authLink = setContext(async (_: any, { headers }) => {
  // const idToken = await getIdToken();
  return {
    headers: {
      ...headers,
      authorization: '',
    },
  };
});

const client = new ApolloClient({
  link: concat(authLink, httpLink),
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  cache: new InMemoryCache(),
  connectToDevTools: process.env.NODE_ENV !== 'production',
  ssrMode: true,
});

export default client;
