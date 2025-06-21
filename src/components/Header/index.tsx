import LocaleSwitcher from '../LocaleSwitcher';
import styles from './index.module.scss';

export default function Header() {
  return (
    <nav className={styles.header}>
      <div className={styles.logo}>ŞUBİLET</div>
      <LocaleSwitcher />
    </nav>
  );
}
