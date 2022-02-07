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
          <meta charSet="UTF-8" />
          <meta
            name="keywords"
            content="Twitter, Tweets, Activity Calendar, Tweets Graph"
          />
          <meta name="twitter:card" content="summary" />
          <meta property="og:title" content="Tweets Calendar Graph" />
          <meta name="twitter:creator" content="@AskJere" />
          <meta
            property="og:description"
            content="Check out your Tweets Activity in a 7-days calendar graph!"
          />
          <meta
            property="og:image"
            content="https://i.ibb.co/2MKC8Rx/Screen-Shot-2022-02-07-at-10-57-41.png"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap"
            rel="stylesheet"
          />
          <script
            async
            src="https://platform.twitter.com/widgets.js"
            charSet="utf-8"
          />
          <script async src="//static.getclicky.com/101336499.js" />
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
