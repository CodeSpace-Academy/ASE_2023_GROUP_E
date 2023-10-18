// import '@/styles/globals.css'
import LayoutAll from "@/Layout/layout"
import { ContextProvider } from "@/useContext/StateContext"
export default function App({ Component, pageProps }) {
  return (
    <ContextProvider>
      <LayoutAll>
        <Component {...pageProps} />
      </LayoutAll>
    </ContextProvider>
  )
}
