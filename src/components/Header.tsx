import Link from 'next/link'

import styles from '@styles/modules/Header.module.scss';

type HeaderProps = {
  isLoading: boolean
}

const Header = ({ isLoading }: HeaderProps) => (
  <div className={styles.wrapper}>
    <Link href="/" className={styles.title}>
      Podcaster
    </Link>
    {isLoading && <p>Loading....</p>}
  </div>
)

export default Header;
