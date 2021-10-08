import { NextPage, NextPageContext } from 'next';
import Footer from '../components/Footer';
import Input from '../components/Input';
import Logo from '../components/Logo';
import TweetsGraph from '../components/TweetsGraph';

import styles from '../styles/GraphPage.module.css';

interface Props {
  tweetsData: TweetsData | null;
  username: string;
}

const GraphPage: NextPage<Props> = ({ tweetsData, username }) => {
  return (
    <main className={styles.container}>
      <Logo />

      <Input defaultValue={username} />

      {tweetsData ? (
        <TweetsGraph tweetsData={tweetsData} username={username} />
      ) : (
        <p className={styles.not_found}>
          No data found for @{username} ☹️ Try someone else
        </p>
      )}

      <Footer />
    </main>
  );
};

export const getServerSideProps = async ({ query }: NextPageContext) => {
  const username = query.username || '';
  const BASE_URL =
    process.env.ENV === 'production'
      ? process.env.PRODUCTION_URL
      : 'http://localhost:' + process.env.PORT;

  try {
    const res = await fetch(`${BASE_URL}/api/twitter/count/${username}`);
    const data = await res.json();

    return { props: { tweetsData: data, username } };
  } catch (error) {
    return { props: { tweetsData: null, username } };
  }
};

export default GraphPage;
