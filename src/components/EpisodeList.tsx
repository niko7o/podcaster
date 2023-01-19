import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from '@styles/modules/EpisodeList.module.scss';

import { getReadableDate, getReadableDuration } from '@/utils';

import { IEpisodeList } from '@types';

const EpisodeList: React.FC<IEpisodeList> = ({ episodes }) => {
  const router = useRouter();
  const { podcastId } = router.query;

  return (
    <div className={styles['episode-list']}>
      <div className={styles['episode-list-counter']}>
        <h2>Episodes: {episodes.length}</h2>
      </div>

      <div className={styles['episodes']}>
        <table className={styles['episode-list-table']}>
          <thead>
            <tr className={styles['episode-list-table-header']}>
              <td>Title</td>
              <td>Date</td>
              <td>Duration</td>
            </tr>
          </thead>

          <tbody>
            {episodes.map(episode => (
              <tr className={styles['episode-list-row']} key={episode.title}>
                <td className={styles['episode-list-title']}>
                  <Link href={`./${podcastId}/episode/${episode.episodeId}`}>
                    {episode.title}
                  </Link>
                </td>
                <td>{getReadableDate(episode.date)}</td>
                <td>{getReadableDuration(episode.duration)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default EpisodeList;
