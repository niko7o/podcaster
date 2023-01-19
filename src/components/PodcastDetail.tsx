import axios from 'axios'

import { useState, useEffect } from 'react';

import { IPodcastDetail, ApiPodcastDetailResponse, IEpisodeDetail } from '@types';

import Sidebar from '@components/Sidebar';
import EpisodeList from '@components/EpisodeList';

import styles from '@styles/modules/PodcastDetail.module.scss';

type Props = {
  podcastId: string | string[] | undefined
} 

const PodcastDetail: React.FC<Props> = ({ podcastId }) => {
  const [isLoading, setLoading] = useState(false);
  const [podcast, setPodcast] = useState<IPodcastDetail | null>(null);
  
  // @TO-DO: add fetched podcast info to localStorage same as PodcastList

  const getPodcastDetail = async () => {
    const EPISODE_LIMIT = 30;
    const baseUrl = `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=${EPISODE_LIMIT}`
    const fullUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(baseUrl)}`
    
    try {
      setLoading(true)
      const { data } = await axios.get(fullUrl);
      if (data) {
        const results = JSON.parse(data.contents).results;
        console.log('getPodcastDetail', results)
        const formattedPodcast = {
          details: {
            image: results[0].artworkUrl600,
            title: results[0].collectionName,
            author: results[0].artistName,
            description: results[1].description,
          },
          episodes: results.map((episode: ApiPodcastDetailResponse): IEpisodeDetail => ({
            title: episode.trackName,
            date: episode.releaseDate,
            duration: episode.trackTimeMillis,
            episodeId: episode.trackId,
            episodeDescription: episode.description,
            episodeAudio: episode.episodeUrl
          }))
        }
        setPodcast(formattedPodcast);
      }      
      setLoading(false)
    } catch (err) {
      console.log('getPodcastDetail exception', err);
      return null;
    }
  }

  console.log('podcast', podcast)

  useEffect(() => {
    getPodcastDetail()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      {isLoading && <h1>Loading..</h1>}
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
