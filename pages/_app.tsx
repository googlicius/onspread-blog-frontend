import { FC, useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import client from '@/apollo-client';
import { meQueryAsync } from '@/redux/meProducer';
import store from '@/redux/store';
import '@/styles/scss/styles.scss';
import { useRouter } from 'next/router';

const InitApp: FC = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(meQueryAsync());

    router.beforePopState((state) => {
      state.options.scroll = false;
      return true;
    });
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
