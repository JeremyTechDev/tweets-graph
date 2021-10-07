import styles from '../styles/Home.module.css';

const Footer = () => (
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
);

export default Footer;
