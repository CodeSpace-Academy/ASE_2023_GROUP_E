import '../styles/globals.css';
import NextNProgress from 'nextjs-progressbar';
import LayoutAll from '../component/Layout/';
import { ContextProvider } from '../useContext/StateContext';

// Main App component that serves as the entry point for the Next.js application
export default function App({ Component, pageProps }) {
  return (
    <ContextProvider>
      <LayoutAll>
        <NextNProgress startPosition={0.3} stopDelayMs={200} height={5} showOnShallow />
        {/* Render the current page component with its props */}
        <Component {...pageProps} />
      </LayoutAll>
    </ContextProvider>
  );
}
