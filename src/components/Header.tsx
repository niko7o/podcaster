import styles from '@styles/modules/Header.module.scss';

type HeaderProps = {
  isLoading: boolean
}

const Header = ({ isLoading }: HeaderProps) => (
  <div className={styles.wrapper}>
    <h1 className={styles.title}>Podcaster</h1>
    {isLoading && <p>Loading....</p>}
  </div>
)

export default Header;
