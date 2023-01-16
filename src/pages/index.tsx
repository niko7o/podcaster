import Head from 'next/head'

import Header from '@components/Header';

const Home = () => {
  return (
    <>
      <Head>
        <title>Podcaster</title>
        <meta name="description" content="Small application to listen to musical podcasts." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <>
        <Header />
      </>
    </>
  )
}

export default Home;
