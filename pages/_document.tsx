import Document, {
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import { NormalizedCacheObject } from '@apollo/client';
import { Footer } from '@/components/layout/Footer';
import client from '@/configs/apollo-client';

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
          <Footer />
          <NextScript />
          <script
            id="__APOLLO_STATE__"
            type="application/json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(this.props.apolloState),
            }}
          />
          <script
            src={`//cdn.iframe.ly/embed.js?api_key=${process.env.NEXT_PUBLIC_IFRAMELY_API_KEY}`}
            async
          ></script>

          {/* <script
            src="https://cdn.socket.io/3.1.3/socket.io.min.js"
            integrity="sha384-cPwlPLvBTa3sKAgddT6krw0cJat7egBga3DJepJyrLl4Q9/5WLra3rrnMcyTyOnh"
            crossOrigin="anonymous"
            async
          /> */}
        </body>
      </Html>
    );
  }
}

export default MyDocument;
