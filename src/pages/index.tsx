import Head from 'next/head'

import PodcastList from '@components/PodcastList/PodcastList';

const Homepage = () => (
  <>
    <Head>
      <title>Podcaster | Home</title>
      <meta name="description" content="Small application to listen to musical podcasts." />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <>
      <PodcastList />
    </>
  </>
)

export default Homepage;
