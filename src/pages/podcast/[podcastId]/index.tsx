import Head from 'next/head'
import { useRouter } from 'next/router'

import PodcastDetail from '@components/PodcastDetail/PodcastDetail';

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
        {router.isReady && <PodcastDetail podcastId={podcastId} />}
      </>
    </>
  )
}

export default PodcastDetailPage;
