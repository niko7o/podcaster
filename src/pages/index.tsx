import Head from 'next/head'

import Header from '@components/Header';
import PodcastList from '@components/PodcastList';

const Homepage = () => {
  return (
    <>
      <Head>
        <title>Podcaster | Home</title>
        <meta name="description" content="Small application to listen to musical podcasts." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <>
        <Header isLoading={false} />
        <PodcastList />
      </>
    </>
  )
}

export default Homepage;
