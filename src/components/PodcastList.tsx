import { useEffect, useState } from 'react';

import Image from 'next/image'
import axios from 'axios'

import styles from '@styles/PodcastList.module.scss'

type Podcast = {
  image: string,
  title: string,
  author: string
}

const MOCKED_PODCASTS = [
  {
    title: 'Sunrise',
    image: 'https://is3-ssl.mzstatic.com/image/thumb/Podcasts113/v4/07/88/b3/0788b35f-1829-6fbd-2488-ecaf83b8d8ab/mza_9852863690630397024.jpg/170x170bb.png',
    author: 'Sam'
  },
  {
    title: 'Long Forest',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts113/v4/f2/21/fa/f221fabd-017f-5125-633b-f1fe4f39802a/mza_182995249085044287.jpg/170x170bb.png',
    author: 'John'
  },
  {
    title: 'Coffee',
    image: 'https://is2-ssl.mzstatic.com/image/thumb/Podcasts125/v4/7b/cf/f6/7bcff6bb-5f99-6c2f-c6c5-3a9799f3df21/mza_8544742664200824246.jpg/170x170bb.png',
    author: 'Sara'
  },
  {
    title: 'Coffee',
    image: 'https://is2-ssl.mzstatic.com/image/thumb/Podcasts125/v4/7b/cf/f6/7bcff6bb-5f99-6c2f-c6c5-3a9799f3df21/mza_8544742664200824246.jpg/170x170bb.png',
    author: 'Sara'
  },
  {
    title: 'Coffee',
    image: 'https://is2-ssl.mzstatic.com/image/thumb/Podcasts125/v4/7b/cf/f6/7bcff6bb-5f99-6c2f-c6c5-3a9799f3df21/mza_8544742664200824246.jpg/170x170bb.png',
    author: 'Sara'
  }
];

const PodcastList = () => {
  const [podcasts, setPodcasts] = useState<Podcast[]>([])
  const [isLoading, setLoading] = useState<boolean>(false)
  
  const LOCAL_STORAGE_KEY = 'storedPodcasts';

  const topPodcastsUri = 'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json';

  const getStoredPodcasts = () => {
    const storedPodcasts = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedPodcasts ? JSON.parse(storedPodcasts) : {};
  }

  const getTimeDiffHours = (date: Date) => {
    const now = new Date();
    let diff = (now.getTime() - date.getTime()) / 1000;
    diff /= (60 * 60);
    return Math.abs(Math.round(diff));
  }
  
  useEffect(() => {
    setLoading(true);
    getStoredPodcasts();
    setLoading(false);
  }, [])

  return (
    <>
      <div className={styles.wrapper}>
        {MOCKED_PODCASTS.map((podcast, i) => (
          <div className={styles.podcast} key={`${podcast.image}-${i}`} data-test="podcast">
            <Image
              className={styles['podcast-cover']}
              src={podcast.image} 
              width={100} 
              height={100}
              alt={podcast.title}
              data-test="podcast-image"
            />

            <p className={styles['podcast-title']} data-test="podcast-title">
              {podcast.title}
            </p>
            
            <p className={styles['podcast-author']} data-test="podcast-author">
              Author: {podcast.author}
            </p>
          </div>
        ))}
      </div>
   </>
  )
}

export default PodcastList;
