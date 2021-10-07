import styles from '../styles/Home.module.css';
import graphStyles from '../styles/TweetsGraph.module.css';

const Logo = () => (
  <a href="/" className={styles.logo__container}>
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
  </a>
);

export default Logo;
