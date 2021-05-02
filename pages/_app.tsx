import { FC, useEffect } from 'react';
import { ApolloProvider } from '@apollo/client';
import '@/styles/globals.scss';
import client from '@/apollo-client';
import { Provider, useDispatch } from 'react-redux';
import store from '@/redux/store';
import { meInitialAsync } from '@/redux/meProducer';

const InitApp: FC = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(meInitialAsync());
  }, []);

  return <>{children}</>;
};

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <InitApp>
          <Component {...pageProps} />
        </InitApp>
      </Provider>
    </ApolloProvider>
  );
}

export default MyApp;
