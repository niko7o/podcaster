import axios from 'axios'

import { useState, useEffect } from 'react';

import { IPodcastDetail, ApiPodcastDetailResponse, IPodcastDetailEpisode } from '@types';

import Sidebar from '@components/Sidebar';
import EpisodeList from '@components/EpisodeList';

import styles from '@styles/modules/PodcastDetail.module.scss';

const PodcastDetail = ({ podcastId }) => {
  const [isLoading, setLoading] = useState(false);
  const [podcast, setPodcast] = useState<IPodcastDetail | null>(null);
  
  // @TO-DO: add fetched podcast info to localStorage same as PodcastList

  const getPodcastDetail = async () => {
    const EPISODE_LIMIT = 9;
    const baseUrl = `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=${EPISODE_LIMIT}`
    const fullUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(baseUrl)}`
    
    try {
      setLoading(true)
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
          episodes: results.map((episode: ApiPodcastDetailResponse): IPodcastDetailEpisode => ({
            title: episode.trackName,
            date: episode.releaseDate,
            duration: episode.trackTimeMillis
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

  useEffect(() => {
    getPodcastDetail()
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
