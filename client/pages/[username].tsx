import { NextPage, NextPageContext } from 'next';
import TweetsGraph from '../components/TweetsGraph';

import styles from '../styles/GraphPage.module.css';

interface Props {
  tweetsData: TweetsData;
  userData: {
    username: string;
  };
}

const GraphPage: NextPage<Props> = ({ tweetsData }) => {
  return (
    <main className={styles.container}>
      <span />

      <TweetsGraph tweetsData={tweetsData} />

      <footer className={styles.footer}>
        Crafted with ♥️ by{' '}
        <a
          className={styles.footer__link}
          href="https://twitter.com/AskJere"
          target="_blank"
        >
          @AskJere
        </a>
      </footer>
    </main>
  );
};

export const getServerSideProps = async ({ query }: NextPageContext) => {
  const username = query.username || '';
  const userData = { username };

  const res = await fetch(`http://localhost:5000/api/twitter/count/${username}`);
  console.log(res);
  const data = await res.json();

  return { props: { tweetsData: data, userData } };
};

export default GraphPage;
