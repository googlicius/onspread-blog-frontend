import Document, { Html, Head, Main, NextScript } from 'next/document';
import Navigation from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6"
            crossOrigin="anonymous"
          />
          <link href="css/styles.css" rel="stylesheet" />
        </Head>
        <body>
          <Navigation />
          <Main />
          <NextScript />
          <Footer />
          <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
          <script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf"
            crossOrigin="anonymous"
          ></script>
          <script src="js/scripts.js"></script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
