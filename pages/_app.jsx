/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.css';
import LayoutAll from '@/component/Layout/layout';
import { ContextProvider } from '../useContext/StateContext';
import NextNProgress from 'nextjs-progressbar';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@700&family=Roboto:ital@1&display=swap"
          rel="stylesheet"
        />
      </Head>

      <ContextProvider>
        <LayoutAll>
          <NextNProgress startPosition={0.3} stopDelayMs={200} height={5} showOnShallow={true} />
          <Component {...pageProps} />
        </LayoutAll>
      </ContextProvider>
    </>
  );
}

