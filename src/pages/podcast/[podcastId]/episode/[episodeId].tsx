import Head from 'next/head';
import { useRouter } from 'next/router';

import EpisodeDetail from '@/components/EpisodeDetail';
import Header from '@components/Header';

const EpisodePage = () => {
  const router = useRouter();
  const { episodeId } = router.query;
  
  return (
    <>
      <Head>
        <title>Episode: {episodeId}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <>
        <Header isLoading={false} />
        <EpisodeDetail episodeId={episodeId} />
      </>
    </>
  )
}

export default EpisodePage;
