import Document, { Head, Html, Main, NextScript } from 'next/document';
import { Footer } from '@/components/layout/Footer';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
          <Footer />
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
