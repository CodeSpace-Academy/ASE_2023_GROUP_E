import '@/styles/globals.css'
import Notification from "@/component/Notification/notification";
import NotificationContextProvider from "@/component/store/notification-context";


export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
  return <Notification />
  return <NotificationContextProvider />

}

