import { IPodcastDetailSidebar } from "@/types";

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from '@styles/modules/Sidebar.module.scss';

const Sidebar: React.FC<IPodcastDetailSidebar> = ({
  image,
  title,
  author,
  description
}) => {
  const router = useRouter();
  const { podcastId } = router.query;

  return (
    <div className={styles.sidebar}>

    <Link href={`/podcast/${podcastId}`}>
      <Image 
        className={styles['sidebar-image']} 
        width="400" 
        height="400" 
        src={image} 
        alt={title} 
      />
    /</Link>
      
      <div className={styles['sidebar-info']}>
        <p><strong>{title}</strong></p>
        <span>by</span> 
        <Link href={`/podcast/${podcastId}`} className={styles['font-italic']}>{author}</Link>
      </div>

      <div className={styles['sidebar-description']}>
        <p><strong>Description:</strong></p>
        <p className={styles['font-italic']}>{description}</p>
      </div>
    </div>
  );
}

export default Sidebar;
