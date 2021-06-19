import React, { useState } from 'react';
import App from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { ApolloProvider, concat } from '@apollo/client';
import client, { authLink, httpLink } from '@/apollo-client';
import store from '@/redux/store';
import 'react-toastify/dist/ReactToastify.css';
import 'nprogress/nprogress.css';
import '@/styles/scss/styles.scss';
import { meQueryAsync } from '@/redux/meProducer';

let progressBarTimeout = null;

NProgress.configure({
  showSpinner: false,
});

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

const InitApp: React.FC = ({ children }) => {
  const [initialized, setInitialized] = useState(false);

  // Restore cache generated from server side.
  if (!initialized && typeof window !== 'undefined') {
    const cache = client.cache.extract();
    const apolloState = document.getElementById('__APOLLO_STATE__');
    if (apolloState && !cache.ROOT_QUERY) {
      client.cache.restore(JSON.parse(apolloState.innerHTML));
    }
    store.dispatch(meQueryAsync());
    setInitialized(true);
    return null;
  }

  return <>{children}</>;
};

interface Props {
  Component: React.FC;
  pageProps: any;
}

function MyApp({ Component, pageProps }: Props): JSX.Element {
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

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
MyApp.getInitialProps = async (appContext) => {
  const promises: Promise<any>[] = [App.getInitialProps(appContext)];
  if (typeof window === 'undefined') {
    client.setLink(concat(authLink(appContext.ctx), httpLink));
    promises.push(store.dispatch(meQueryAsync()));
  }
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const [appProps] = await Promise.all(promises);

  return { ...appProps };
};

export default MyApp;
