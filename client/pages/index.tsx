import ExhibitionGraph from '../components/ExhibitionGraph';
import Footer from '../components/Footer';
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

      <ExhibitionGraph />

      <Footer />
    </main>
  );
};

export default Home;
