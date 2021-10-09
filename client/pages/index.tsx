import ExhibitionGraph from '../components/ExhibitionGraph';
import Footer from '../components/Footer';
import Input from '../components/Input';
import Logo from '../components/Logo';

import styles from '../styles/Home.module.css';

const Home = () => {
  return (
    <main className={styles.container}>
      <Logo />

      <div className={styles.header}>
        <h1 className={styles.heading}>Tweets Calendar Graph</h1>
        <h3 className={styles.subheading}>
          Check out your Tweets Activity in a 7-days calendar graph by hour!
        </h3>
      </div>

      <div className={styles.section}>
        <input type="hidden" />
        <Input
          afterText=" to check yours!"
          beforeText="Enter your Twitter"
          placeholder="{username}"
        />

        <ExhibitionGraph />
      </div>

      <Footer />
    </main>
  );
};

export default Home;
