import { NextPage } from 'next';
import Image from 'next/image';
import TweetsGraph from '../components/TweetsGraph';

import styles from '../styles/Home.module.css';
interface Props {
  tweetsData: TweetsData;
}

const Home: NextPage<Props> = ({ tweetsData }) => {
  return (
    <main className={styles.container}>
      <p>image logo</p>

      <div>
        <h1>Tweets Calendar Graph</h1>
        <h3>
          Check out your Tweets Activity in a 7-days calendar graph by hour!
        </h3>
      </div>

      <TweetsGraph tweetsData={tweetsData} />
      <button>Sign In with Twitter</button>

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
export const getServerSideProps = async () => {
  const res = await fetch('http://localhost:5000/api/twitter/count/AskJere');
  const tweetsData = await res.json();

  return { props: { tweetsData } };
};
export default Home;
