import { IPodcastDetailSidebar } from "@/types";

import Image from 'next/image'

import styles from '@styles/modules/Sidebar.module.scss';

const Sidebar: React.FC<IPodcastDetailSidebar> = ({
  image,
  title,
  author,
  description
}) => {
  return (
    <div className={styles.sidebar}>
      <Image 
        className={styles['sidebar-image']} 
        width="400" 
        height="400" 
        src={image} 
        alt={title} 
      />
      
      <div className={styles['sidebar-info']}>
        <p><strong>{title}</strong></p>
        <p>by {author}</p>
      </div>

      <div className={styles['sidebar-description']}>
        <p><strong>Description:</strong></p>
        <p className={styles['font-italic']}>{description}</p>
      </div>
    </div>
  );
}

export default Sidebar;
