import { NextPage } from 'next';

import ExhibitionGraph from '../components/ExhibitionGraph';

import styles from '../styles/Home.module.css';
import graphStyles from '../styles/TweetsGraph.module.css';
interface Props {
  tweetsData: TweetsData;
}

const Home: NextPage<Props> = ({ tweetsData }) => {
  return (
    <main className={styles.container}>
      <section className={styles.logo__container}>
        <div className={styles.logo}>
          <span
            className={`${graphStyles.graph__item} ${graphStyles['graph__item--none']}`}
          />
          <span
            className={`${graphStyles.graph__item} ${graphStyles['graph__item--light']}`}
          />
          <span
            className={`${graphStyles.graph__item} ${graphStyles['graph__item--medium']}`}
          />
          <span
            className={`${graphStyles.graph__item} ${graphStyles['graph__item--full']}`}
          />
        </div>

        <span className={styles.logo__title}>Tweets Graph</span>
      </section>

      <div className={styles.header}>
        <h1 className={styles.heading}>Tweets Calendar Graph</h1>
        <h3 className={styles.subheading}>
          Check out your Tweets Activity in a 7-days calendar graph by hour!
        </h3>
      </div>

      <ExhibitionGraph />

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
