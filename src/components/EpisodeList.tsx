import styles from '@styles/modules/EpisodeList.module.scss';

import { IPodcastDetail } from '@types';

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
                <td>{episode.title}</td>
                <td>{episode.date}</td>
                <td>{episode.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default EpisodeList;
