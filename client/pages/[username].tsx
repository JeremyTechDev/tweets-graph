import { NextPage } from 'next';
import TweetsGraph from '../components/TweetsGraph';

import styles from '../styles/GraphPage.module.css';

import data from '../../../data.json';

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

export const getServerSideProps = () => {
  const tweetsData = data;
  const userData = { username: 'AskJere' };

  return { props: { tweetsData, userData } };
};

export default GraphPage;
