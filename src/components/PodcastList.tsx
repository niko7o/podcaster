import { useEffect, useState } from 'react';

import axios from 'axios'

import { IPodcast, ApiPodcast } from '@types';
import Podcast from '@components/Podcast';

import styles from '@styles/modules/PodcastList.module.scss'

const LOCAL_STORAGE_KEY = 'PODCAST_LIST';

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

  const generateFriendlySlugFromUrl = (url: string) => {
    const parts = url.split("/");
    const start = parts.indexOf("podcast") + 1;
    const end = parts.indexOf("id");
    const slug = parts.slice(start, end).join("/");
    return slug;
  }

  const getPodcasts = async () => {
    const uri = 'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json';
    try {
      const { data: { feed: { entry: apiPodcasts } } } = await axios.get(uri);
      // original API response comes with many fields we don't use, cleanup below
      const minifiedPodcasts = apiPodcasts.map(((item: ApiPodcast) => ({
        id: item['id']['label'],
        image: item['im:image'][2]['label'],
        title: item['title']['label'],
        author: item['im:artist']['label'],
        slug: generateFriendlySlugFromUrl(item['id']['label'])
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
          <Podcast {...podcast} key={podcast.id}/>
        ))}
      </div>
   </>
  )
}

export default PodcastList;
