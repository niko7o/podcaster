import Link from 'next/link'
import Image from 'next/image'

import { IPodcast } from '@types';

import styles from './Podcast.module.scss'

const Podcast: React.FC<IPodcast> = ({ id, image, title, author }) => (
  <>
    <div className={styles.podcast} data-test="podcast">
      <Image
        className={styles['podcast-cover']}
        src={image} 
        width={100} 
        height={100}
        alt={title}
        data-test="podcast-image"
      />

      <Link 
        className={styles['podcast-title']} 
        data-test="podcast-title"
        href={{
          pathname: '/podcast/[podcastId]',
          query: { podcastId: id },
        }}
      >
        {title}
      </Link>
      
      <p className={styles['podcast-author']} data-test="podcast-author">
        Author: {author}
      </p>
    </div>
  </>
)

export default Podcast;
