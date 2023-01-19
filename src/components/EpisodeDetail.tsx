import styles from '@styles/modules/EpisodeDetail.module.scss';

import Sidebar from '@components/Sidebar';

type Props = {
  episodeId: string | string[] | undefined
}

const EpisodeDetail: React.FC<Props> = ({ episodeId }) => {
  return (
    <>
      <Sidebar 
        image={'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'} 
        title={'c'} 
        author={'b'} 
        description={'a'} 
      />
      
      <div className={styles['episode-detail']}>
        <h1>Episode: {episodeId}</h1>
        <p>Lorem ipsum episode description bla bla</p>
        <p>Sponsored by</p>
        <audio controls>
          <source src="https://dts.podtrac.com/redirect.mp3/dovetail.prxu.org/_/93/4de981be-4f3f-472a-8ff9-f4ed722d0a42/SongExploder240_PanicAtTheDisco.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </>
  )
}

export default EpisodeDetail;
