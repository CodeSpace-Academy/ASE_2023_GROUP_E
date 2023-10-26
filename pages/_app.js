
import '@/styles/globals.css'
import LayoutAll from "@/component/Layout/layout"
import { ContextProvider } from "@/useContext/StateContext"
import {SessionProvider} from 'next-auth/react'

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider  >
      <ContextProvider>
        <LayoutAll>
          <Component {...pageProps} />
        </LayoutAll>
      </ContextProvider>
    </SessionProvider>
  )
}