import { useRouter } from 'next/router';
import Link from 'next/link';

import Header from '@components/Header/Header';
import Sidebar from '@components/Sidebar/Sidebar';

import { IEpisodeDetail } from '@types'

import styles from './EpisodeDetail.module.scss';

type Props = {
  episodeId: string | string[] | undefined
}

const EpisodeDetail: React.FC<Props> = ({ episodeId }) => {
  const router = useRouter();
  const { podcastId } = router.query;

  const getEpisodeInformation = () => {
    const key = `PODCAST_${podcastId}`;
    const data = localStorage.getItem(key);
    if (data) {
      const cachedData = JSON.parse(data);
      const details = cachedData.storedData.details;
      const episode = cachedData.storedData.episodes.find(
        (ep: IEpisodeDetail) => ep.episodeId.toString() === episodeId)
      return { details, episode };
    }
    return {};
  }

  const { episode, details } = getEpisodeInformation();
    
  return (
    <>
      <Header isLoading={false} />
      
      <div className={styles['episode-detail']}>
        <Sidebar 
          image={details.image} 
          title={details.title} 
          author={details.author} 
          description={details.description}
        />
        
        <div className={styles['episode-detail-main']} data-test="episode-detail">
          <p className={styles['episode-detail-title']} data-test="episode-detail-title">
            <Link 
              href={`/podcast/${podcastId}`}
              data-test="episode-title"
            >
              {episode.title}
            </Link>
          </p>

          <div
            className={styles['episode-detail-description']}
            dangerouslySetInnerHTML={{ __html: episode.episodeDescription }}
          />
            
          <audio controls data-test="episode-detail-mp3">
            <source src={episode.episodeAudio} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
    </>
  )
}

export default EpisodeDetail;
