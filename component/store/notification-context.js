import { createContext } from "react";

const NotificationContext = createContext ({
    notification : null,
    showNotification: function () {},
    hideNotification: function () {}

})

export function NotificationContextProvider (props) {
    <NotificationContext.Provider>
    {props.children}
   </NotificationContext.Provider>
}


export default NotificationContext