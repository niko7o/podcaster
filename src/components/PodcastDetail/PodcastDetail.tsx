import axios from 'axios'

import { useState, useEffect } from 'react';

import { IPodcastDetail, ApiPodcastDetailResponse, IEpisodeDetail } from '@types';

import Sidebar from '@components/Sidebar/Sidebar';
import EpisodeList from '@components/EpisodeList/EpisodeList';
import Header from '@components/Header/Header';

import useLocalStorage from '@hooks/useLocalStorage';
import { fetchOnlyAfter24Hours } from '@/utils';

import styles from './PodcastDetail.module.scss';

type Props = {
  podcastId: string | string[] | undefined
} 

const PodcastDetail: React.FC<Props> = ({ podcastId }) => {
  const [isLoading, setLoading] = useState(false);
  const [podcast, setPodcast] = useState<IPodcastDetail | null>(null);

  const { setValue } = useLocalStorage();
  const PODCAST_KEY = `PODCAST_${podcastId}`;

  const getDetailsFromAPIOrLocal = async () => {
    setLoading(true);
    await fetchOnlyAfter24Hours(PODCAST_KEY, getPodcastDetail, setPodcast);
    setLoading(false);
  }
  
  const getPodcastDetail = async () => {
    const EPISODE_LIMIT = 30;
    const baseUrl = `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=${EPISODE_LIMIT}`
    const fullUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(baseUrl)}`
    
    try {
      setLoading(true);
      const { data } = await axios.get(fullUrl);
      if (data) {
        const results = JSON.parse(data.contents).results;
        const formattedPodcast = {
          details: {
            image: results[0].artworkUrl600,
            title: results[0].collectionName,
            author: results[0].artistName,
            description: results[1].description,
          },
          episodes: results.slice(1, results.length).map((episode: ApiPodcastDetailResponse): IEpisodeDetail => ({
            title: episode.trackName,
            date: episode.releaseDate,
            duration: episode.trackTimeMillis,
            episodeId: episode.trackId,
            episodeDescription: episode.description,
            episodeAudio: episode.episodeUrl
          }))
        }
        setPodcast(formattedPodcast);
        setValue(PODCAST_KEY, JSON.stringify({ 
          storedData: formattedPodcast,
          lastFetchDate: new Date()
        }));
      }      
      setLoading(false);
    } catch (err) {
      console.log('getPodcastDetail exception', err);
      setLoading(false);
      return null;
    }
  }

  useEffect(() => {
    getDetailsFromAPIOrLocal()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <Header isLoading={isLoading} />

      {podcast && (
        <div className={styles['podcast-detail']}>
          <Sidebar
            image={podcast.details.image} 
            title={podcast.details.title} 
            author={podcast.details.author} 
            description={podcast.details.description} 
          />
          <EpisodeList episodes={podcast.episodes} />
        </div>
      )}
    </div>
  )
}

export default PodcastDetail;
