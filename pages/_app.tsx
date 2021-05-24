import { FC, useEffect } from 'react';
import NProgress from 'nprogress';
import { Provider, useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Router from 'next/router';
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

function MyApp({ Component, pageProps }): JSX.Element {
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
