import { ContextProvider } from '@/UseContext/Context'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <ContextProvider>
      <Component {...pageProps} />
    </ContextProvider>
  )
}
