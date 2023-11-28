import '../styles/globals.css';
import NextNProgress from 'nextjs-progressbar';
import LayoutAll from '../component/Layout/layout';
import { ContextProvider } from '../useContext/StateContext';

export default function App({ Component, pageProps }) {
  return (
    <ContextProvider>
      <LayoutAll>
        <NextNProgress startPosition={0.3} stopDelayMs={200} height={5} showOnShallow />
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </LayoutAll>
    </ContextProvider>
  );
}
