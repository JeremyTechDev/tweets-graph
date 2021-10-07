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
        <p className={styles.not_found}>No data found for @{username} ☹️ Try someone else</p>
      )}

      <Footer />
    </main>
  );
};

export const getServerSideProps = async ({ query }: NextPageContext) => {
  const username = query.username || '';

  try {
    const res = await fetch(
      `http://localhost:5000/api/twitter/count/${username}`,
    );
    const data = await res.json();

    return { props: { tweetsData: data, username } };
  } catch (error) {
    return { props: { tweetsData: null, username } };
  }
};

export default GraphPage;
