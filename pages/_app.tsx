import { FC, useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import client from '@/apollo-client';
import { meQueryAsync } from '@/redux/meProducer';
import store from '@/redux/store';
import '@/styles/scss/styles.scss';

const InitApp: FC = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(meQueryAsync());
  }, []);

  return <>{children}</>;
};

function MyApp({ Component, pageProps }): JSX.Element {
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
