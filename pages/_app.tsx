import React, { FC, useEffect } from 'react';
import NProgress from 'nprogress';
import { Provider, useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Router from 'next/router';
import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
} from '@apollo/client';
import client from '@/apollo-client';
import { meQueryAsync } from '@/redux/meProducer';
import store from '@/redux/store';
import 'react-toastify/dist/ReactToastify.css';
import 'nprogress/nprogress.css';
import '@/styles/scss/styles.scss';
// import { NextPageContext } from 'next';
// import Head from 'next/head';

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
  router: any;
  apolloCache?: NormalizedCacheObject;
  apolloClient?: ApolloClient<NormalizedCacheObject>;
}

function App({
  Component,
  pageProps,
  apolloCache,
  apolloClient = client,
}: Props): JSX.Element {
  // Restore cache generated from server if present.
  apolloClient.cache.restore(apolloCache);

  return (
    <ApolloProvider client={apolloClient}>
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

// App.getInitialProps = async (context) => {
//   const props: Props = {
//     pageProps: context.Component.getInitialProps
//       ? await context.Component.getInitialProps(context)
//       : {},
//   } as Props;

//   console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', context);

//   if (context.ctx.req) {
//     const apolloClient = createApolloClient();
//     try {
//       const { getDataFromTree } = await import('@apollo/client/react/ssr');
//       await getDataFromTree(
//         <App
//           {...props}
//           apolloClient={apolloClient}
//           router={context.router}
//           Component={context.Component}
//         />,
//       );
//     } catch (error) {
//       // Prevent crash from GraphQL errors.
//       console.error(error);
//     }

//     Head.rewind();

//     props.apolloCache = apolloClient.cache.extract();
//   }

//   return props;
// };

export default App;
