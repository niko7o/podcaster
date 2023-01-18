import Link from 'next/link';

import styles from '@styles/modules/EpisodeList.module.scss';

import { IPodcastDetail } from '@types';

const convertMsToReadableTime = (ms:number):string => {
  return new Date(ms).toISOString().slice(11, 19)
}

const EpisodeList: React.FC<IPodcastDetail> = ({ episodes }) => {
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
                <td className={styles['episode-list-title']}><Link href="/">{episode.title}</Link></td>
                <td>{episode.date}</td>
                <td>{convertMsToReadableTime(episode.duration)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default EpisodeList;
