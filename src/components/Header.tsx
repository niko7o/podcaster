import Link from 'next/link'

import Spinner from '@components/Spinner';

import styles from '@styles/modules/Header.module.scss';

type HeaderProps = {
  isLoading: boolean
}

const Header = ({ isLoading }: HeaderProps) => (
  <div className={styles.header}>
    <Link href="/" className={styles.title}>
      Podcaster
    </Link>

    <Spinner isLoading={isLoading} />
  </div>
)

export default Header;
