import { fetchToken, messaging } from "@/firebase"
import { onMessage, Unsubscribe } from "firebase/messaging"
import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "sonner"

const getNotificationPermissionandToken = async () => {
   // Step 1: Check if Notifications are supported in the browser.
   if (!("Notification" in window)) {
      console.info("This browser does not support desktop notifications")
   }

   // Step 2: Check if permission is already granted.
   if (Notification.permission === "granted") {
      return await fetchToken()
   }

   // Step 3: If permission is not denied, request permission from the user.
   if (Notification.permission !== "denied") {
      const permission = await Notification.requestPermission()

      if (permission === "granted") {
         return await fetchToken()
      }
   }

   console.log("Notification permission not granted.")
   return null
}

const useFcmToken = () => {
   const navigate = useNavigate()
   const location = useLocation()

   const [notificationPermissionStatus, setNotificationPermissionStatus] =
      useState<NotificationPermission | null>(null)
   const [token, setToken] = useState<string | null>(null)
   const retryLoadToken = useRef(0)
   const isLoading = useRef(false)

   const loadToken = async () => {
      // Step 4: Prevent multiple fetches if already fetched or in progress.
      if (isLoading.current) return

      isLoading.current = true
      const token = await getNotificationPermissionandToken()

      // Step 5: Handle the case where permission is denied.
      if (Notification.permission === "denied") {
         setNotificationPermissionStatus("denied")
         console.info(
            "%cPush Notifications issue - permission denied",
            "color: green; background: #c7c7c7; padding: 8px; font-size: 20px",
         )
         isLoading.current = false
         return
      }

      // Step 6: Retry fetching the token if necessary. (up to 3 times)
      // This step is typical initially as the service worker may not be ready/installed yet.

      if (!token) {
         if (retryLoadToken.current >= 3) {
            alert("Unable to load token, refresh the browser")
            console.info(
               "%cPush Notifications issue - unable to load token after 3 retries",
               "color: green; background: #c7c7c7; padding: 8px; font-size: 20px",
            )
            isLoading.current = false
            return
         }

         retryLoadToken.current += 1
         console.error("An error occurred while retrieving token. Retrying...")
         isLoading.current = false
         await loadToken()
         return
      }

      // Step 7: Set the fetched token and mark as fetched.
      setNotificationPermissionStatus(Notification.permission)
      setToken(token)
      isLoading.current = false
   }

   useEffect(() => {
      // Step 8: Initialize token loading when the component mounts.
      if ("Notification" in window) {
         loadToken()
      }
   }, [])

   useEffect(() => {
      const setupListener = async () => {
         if (!token) return

         console.log(`onMessage registered with token ${token}`)

         const m = await messaging()
         if (!m) return

         // Step 9: Register a listener for incoming FCM messages.
         const unsubscribe = onMessage(m, (payload) => {
            if (Notification.permission !== "granted") return
            console.log("Foreground push notification received:", payload)

            const link = payload.fcmOptions?.link || payload.data?.link

            if (link) {
               toast.info(`${payload.notification?.title}: ${payload.notification?.body}`, {
                  action: {
                     label: "Open",
                     onClick: () => {
                        const link = payload.fcmOptions?.link || payload.data?.link
                        if (link) {
                           navigate(link)
                        }
                     },
                  },
               })
            } else {
               toast.info(`${payload.notification?.title}: ${payload.notification?.body}`)
            }
         })

         return unsubscribe
      }

      let unsubscribe: Unsubscribe | null = null

      setupListener().then((unsub) => {
         if (unsub) {
            unsubscribe = unsub
         }
      })

      // Step 11: Cleanup the listener when the component unmounts.
      return () => unsubscribe?.()
   }, [token, location.pathname, toast])

   return { token, notificationPermissionStatus } // Return the token and permission status.
}

export default useFcmToken
