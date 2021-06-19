import {
  ApolloClient,
  InMemoryCache,
  // concat,
  ApolloLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries';
import { createUploadLink } from 'apollo-upload-client';
import { sha256 } from 'crypto-hash';

export let httpLink: ApolloLink = new createUploadLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  credentials: 'include',
});

if (process.env.NEXT_PUBLIC_PERSISTED_LINK_DISABLED !== 'true') {
  httpLink = createPersistedQueryLink({ sha256 }).concat(httpLink);
}

// const authLink = setContext(async (_, { headers }) => {
//   const jwtToken =
//     typeof window !== 'undefined' &&
//     localStorage.getItem(process.env.NEXT_PUBLIC_JWT_TOKEN_KEY);

//   return {
//     headers: {
//       ...headers,
//       Authorization: jwtToken ? `Bearer ${jwtToken}` : '',
//     },
//   };
// });

export const authLink = (ctx) => {
  return setContext(async (_, { headers }) => {
    if (!ctx.req.headers.cookie) {
      return headers;
    }

    return {
      headers: {
        ...headers,
        cookie: ctx.req.headers.cookie,
      },
    };
  });
};

/**
 * Method create Apollo Client for both client and server side.
 */
export const createApolloClient = () =>
  new ApolloClient({
    link: httpLink,
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
    cache: new InMemoryCache(),
    connectToDevTools: process.env.NODE_ENV !== 'production',
    ssrMode: typeof window === 'undefined',
  });

/**
 * Client side Apollo Client.
 */
const client = createApolloClient();

export default client;
