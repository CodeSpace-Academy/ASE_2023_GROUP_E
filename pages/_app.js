// import '@/styles/globals.css'
import LayoutAll from "@/Layout/layout"
export default function App({ Component, pageProps }) {
  return (
    <LayoutAll>
      <Component {...pageProps} />
    </LayoutAll>
  )
}
