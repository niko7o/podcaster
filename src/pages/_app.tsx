import '@styles/resets.css';
import '@styles/variables.css';
import '@styles/fonts.css';

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
