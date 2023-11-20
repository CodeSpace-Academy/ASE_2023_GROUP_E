/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.css';
import LayoutAll from '@/component/Layout/layout';
import { ContextProvider } from '../useContext/StateContext';
import NextNProgress from 'nextjs-progressbar';


export default function App({ Component, pageProps }) {
  return (
    <>
     <ContextProvider>
        <LayoutAll>
          <NextNProgress startPosition={0.3} stopDelayMs={200} height={5} showOnShallow={true} />
          <Component {...pageProps} />
        </LayoutAll>
      </ContextProvider>
    </>
  );
}

