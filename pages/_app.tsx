import { ApolloProvider } from '@apollo/client';
import '@/styles/globals.scss';
import client from '@/apollo-client';

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
