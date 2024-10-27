// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getMessaging, getToken, isSupported } from "firebase/messaging"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: import.meta.env.VITE_API_KEY,
   authDomain: import.meta.env.VITE_AUTH_DOMAIN,
   projectId: import.meta.env.VITE_PROJECT_ID,
   storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
   messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
   appId: import.meta.env.VITE_APP_ID,
}

// Initialize Firebase
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()

export const auth = getAuth(app)
// export const messaging = getMessaging(app)

export const messaging = async () => {
   const supported = await isSupported()
   return supported ? getMessaging(app) : null
}

export const fetchToken = async () => {
   try {
      const fcmMessaging = await messaging()
      if (fcmMessaging) {
         const token = await getToken(fcmMessaging, {
            vapidKey: import.meta.env.VITE_FIREBASE_FCM_VAPID_KEY,
         })
         return token
      }
      return null
   } catch (err) {
      console.error("An error occurred while fetching the token:", err)
      return null
   }
}

// export const generateToken = async () => {
//    try {
//       const permission = await Notification.requestPermission()

//       if (permission === "granted") {
//          const token = await getToken(messaging, {
//             vapidKey: import.meta.env.VITE_FIREBASE_FCM_VAPID_KEY,
//          })

//          if (token) {
//             console.log(token)
//          } else {
//             console.log("No registration token available. Request permission to generate one.")
//          }
//       }
//    } catch (error) {
//       console.error(error)
//    }
// }
