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
          <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js"></script>
          <script src="/js/scripts.js"></script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
