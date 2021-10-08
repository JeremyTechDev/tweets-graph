import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="twitter:card" content="summary" />
          <meta property="og:title" content="Tweets Calendar Graph" />
          <meta name="twitter:creator" content="@AskJere" />
          <meta
            property="og:description"
            content="Check out your Tweets Activity in a 7-days calendar graph!"
          />
          <meta
            property="og:image"
            content="https://i.ibb.co/WgR1kKr/Screen-Shot-2021-10-07-at-21-19-29.png"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
