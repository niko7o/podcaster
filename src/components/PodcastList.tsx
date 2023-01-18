import { useEffect, useState } from 'react';

import Image from 'next/image'
import axios from 'axios'

import { IPodcast, ApiPodcast } from '@types';

import styles from '@styles/modules/PodcastList.module.scss'

const LOCAL_STORAGE_KEY = 'STORED_PODCASTS';

const PodcastList: React.FC = () => {
  const [podcasts, setPodcasts] = useState<IPodcast[]>([])
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    const getPodcastsFromStorageOrAPI = async () => {
      try {
        const cachedData = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (cachedData) {
          const cachedPodcasts = JSON.parse(cachedData);
          const lastFetchDate = cachedPodcasts.lastFetchDate;
  
          if (isDateOlderThanADay(lastFetchDate)) {
            await getPodcasts();
          } else {
            setPodcasts(cachedPodcasts.podcasts);
          }
        } else {
          await getPodcasts();
        }
      } catch (err) {
        console.error('getStoredPodcasts exception', err);
      }
    }
    getPodcastsFromStorageOrAPI();
  }, []);

  const getFilteredPodcasts = (podcasts: IPodcast[])  => {
    return podcasts.filter(p => {
      const isTitleMatched = p.title.toLowerCase().includes(searchText.toLowerCase());
      const isAuthorMatched = p.author.toLowerCase().includes(searchText.toLowerCase());
      return isTitleMatched || isAuthorMatched;
    })
  }

  const setPodcastsToLocaleStorage = (podcasts: IPodcast[]) => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY, 
      JSON.stringify({ 
        podcasts,
        lastFetchDate: new Date()
    }));
  }

  const getPodcasts = async () => {
    const uri = 'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json';
    try {
      const { data: { feed: { entry: apiPodcasts } } } = await axios.get(uri);
      // original API response comes with many fields we don't use, cleanup below
      const minifiedPodcasts = apiPodcasts.map(((item: ApiPodcast) => ({
        image: item['im:image'][2]['label'],
        title: item['title']['label'],
        author: item['im:artist']['label']
      })))
      setPodcastsToLocaleStorage(minifiedPodcasts);
      setPodcasts(minifiedPodcasts);
    } catch (err) {
      console.log('getPodcasts exception', err);
      return null;
    }
  }

  const isDateOlderThanADay = (date: Date) => {
    const ONE_DAY_IN_HOURS = 24;
    const today = new Date();
    return (Math.abs(today - date) / 36e5) >= ONE_DAY_IN_HOURS;
  }

  const filteredPodcasts = getFilteredPodcasts(podcasts);

  return (
    <>
      <div className={styles['search']}>
        <span className={styles['search-results']}>
          {filteredPodcasts.length}
        </span>
        <input
          className={styles['search-bar']}
          type="text" 
          value={searchText}
          data-test="search-filter"
          placeholder="Filter podcasts..."
          onChange={(event) => setSearchText(event.target.value)}
        />
      </div>

      <div className={styles.list}>
        {filteredPodcasts.map((podcast) => (
          <div className={styles.podcast} key={podcast.image} data-test="podcast">
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
