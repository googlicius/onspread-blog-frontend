import Document, {
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import { NormalizedCacheObject } from '@apollo/client';
import { Footer } from '@/components/layout/Footer';
import client from '@/apollo-client';

interface Props extends DocumentInitialProps {
  apolloState: NormalizedCacheObject;
}

class MyDocument extends Document<Props> {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, apolloState: client.cache.extract() };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
          <Footer />
          <script id="__APOLLO_STATE__" type="application/json">
            {JSON.stringify(this.props.apolloState)}
          </script>
          <script
            src={`//cdn.iframe.ly/embed.js?api_key=${process.env.NEXT_PUBLIC_IFRAMELY_API_KEY}`}
            async
          ></script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
