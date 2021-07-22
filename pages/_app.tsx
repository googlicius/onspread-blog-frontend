import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { ApolloProvider } from '@apollo/client';
import client from '@/configs/apollo-client';
import store from '@/redux/store';
import 'react-toastify/dist/ReactToastify.css';
import 'nprogress/nprogress.css';
import '@/styles/scss/styles.scss';
import '@/configs/i18n';
import { meQueryAsync, selectMe } from '@/redux/meProducer';
import { loadSocketIOAsync, selectSocket } from '@/redux/socketIOReducer';

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

const InitApp = ({ children }) => {
  const me = useSelector(selectMe);
  const socketState = useSelector(selectSocket);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSocketIOAsync());
  }, []);

  useEffect(() => {
    if (me.value && socketState.isLoaded) {
      socketState.value.emit('join', { userId: me.value.id });
    }
  }, [me, socketState]);

  return <>{children}</>;
};

function MyApp({ Component, pageProps }): JSX.Element {
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

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <InitApp>
          <div className="wrapper">
            <Component {...pageProps} />
          </div>
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
// MyApp.getInitialProps = async (appContext) => {
//   const promises: Promise<any>[] = [App.getInitialProps(appContext)];
//   if (typeof window === 'undefined') {
//     client.setLink(concat(authLink(appContext.ctx), httpLink));
//     promises.push(store.dispatch(meQueryAsync()));
//   }
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const [appProps] = await Promise.all(promises);

//   return { ...appProps };
// };

export default MyApp;
