import { useEffect, useState } from 'react';
import axios from 'axios'

import { IPodcast, ApiPodcastResponse } from '@types';

import Podcast from '@components/Podcast/Podcast';
import Header from '@components/Header/Header';

import useLocalStorage from '@hooks/useLocalStorage';
import { fetchOnlyAfter24Hours } from '@/utils';

import styles from './PodcastList.module.scss'

const LOCAL_STORAGE_KEY = 'PODCAST_LIST';

const PodcastList: React.FC = () => {
  const [podcasts, setPodcasts] = useState<IPodcast[]>([]);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setLoading] = useState(false);

  const { setValue } = useLocalStorage();

  useEffect(() => {
    const getPodcastsFromStorageOrAPI = async () => {
      try {
        setLoading(true);
        await fetchOnlyAfter24Hours(LOCAL_STORAGE_KEY, getPodcasts, setPodcasts)
        setLoading(false);
      } catch (err) {
        console.error('getStoredPodcasts exception', err);
      }
    }
    getPodcastsFromStorageOrAPI();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getFilteredPodcasts = (podcasts: IPodcast[])  => {
    return podcasts.filter(p => {
      const isTitleMatched = p.title.toLowerCase().includes(searchText.toLowerCase());
      const isAuthorMatched = p.author.toLowerCase().includes(searchText.toLowerCase());
      return isTitleMatched || isAuthorMatched;
    })
  }

  const setPodcastsToLocaleStorage = (podcasts: IPodcast[]) => {
    setValue(LOCAL_STORAGE_KEY, JSON.stringify({
      storedData: podcasts,
      lastFetchDate: new Date()
    }))
  }

  const getPodcasts = async () => {
    const uri = 'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json';
    try {
      const { data: { feed: { entry: apiPodcasts } } } = await axios.get(uri);
      // original API response comes with many fields we don't use, cleanup below
      const minifiedPodcasts = apiPodcasts.map(((item: ApiPodcastResponse) => ({
        id: item['id']['attributes']['im:id'],
        image: item['im:image'][2]['label'],
        title: item['title']['label'],
        author: item['im:artist']['label'],
      })))
      setPodcastsToLocaleStorage(minifiedPodcasts);
      setPodcasts(minifiedPodcasts);
    } catch (err) {
      console.log('getPodcasts exception', err);
      return null;
    }
  }

  const filteredPodcasts = getFilteredPodcasts(podcasts);

  return (
    <>
      <Header isLoading={isLoading} />

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
