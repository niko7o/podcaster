import Head from 'next/head'
import { useRouter } from 'next/router'

import Header from '@components/Header';
import PodcastDetail from '@components/PodcastDetail';

const PodcastDetailPage = () => {
  const router = useRouter();
  const { podcastId } = router.query;

  return (
    <>
      <Head>
        <title>Podcast: {podcastId}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <>
        <Header isLoading={false} />
        {router.isReady && <PodcastDetail podcastId={podcastId} />}
      </>
    </>
  )
}

export default PodcastDetailPage;
