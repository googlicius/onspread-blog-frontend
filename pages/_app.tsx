import React, { FC, useEffect } from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';
import { Provider, useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { ApolloProvider } from '@apollo/client';
import client from '@/apollo-client';
import { meQueryAsync } from '@/redux/meProducer';
import store from '@/redux/store';
import 'react-toastify/dist/ReactToastify.css';
import 'nprogress/nprogress.css';
import '@/styles/scss/styles.scss';

let progressBarTimeout = null;

const startProgressBar = () => {
  clearTimeout(progressBarTimeout);
  progressBarTimeout = setTimeout(NProgress.start, 200);
};

const stopProgressBar = () => {
  clearTimeout(progressBarTimeout);
  NProgress.done();
};

Router.events.on('routeChangeStart', startProgressBar);
Router.events.on('routeChangeComplete', stopProgressBar);
Router.events.on('routeChangeError', stopProgressBar);

const InitApp: FC = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(meQueryAsync());
  }, []);

  return <>{children}</>;
};

interface Props {
  Component: React.FC;
  pageProps: any;
}

function MyApp({ Component, pageProps }: Props): JSX.Element {
  // Restore cache generated from server if present.
  if (typeof window !== 'undefined') {
    const apolloState = document.getElementById('__APOLLO_STATE__');
    client.cache.restore(
      JSON.parse(apolloState.innerHTML.replace(/&quot;/gi, '"')),
    );
  }

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <InitApp>
          <Component {...pageProps} />
          <ToastContainer
            position="top-center"
            autoClose={3000}
            newestOnTop={false}
            closeOnClick
            hideProgressBar
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            toastStyle={{ fontSize: '14px' }}
          />
        </InitApp>
      </Provider>
    </ApolloProvider>
  );
}

export default MyApp;
