// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries

// are not available in the service worker.
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js")
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js")

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object

firebase.initializeApp({
   apiKey: "AIzaSyAZrb69G70ofowFARPE-KvhBYGk--YI6eM",
   authDomain: "elektra-ecommerce-a7944.firebaseapp.com",
   projectId: "elektra-ecommerce-a7944",
   storageBucket: "elektra-ecommerce-a7944.appspot.com",
   messagingSenderId: "411834937736",
   appId: "1:411834937736:web:4d089b7b8f41df18010a3d",
})

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
   console.log("[firebase-messaging-sw.js] Received background message ", payload)

   // payload.fcmOptions?.link comes from our backend API route handle
   // payload.data.link comes from the Firebase Console where link is the 'key'
   const link = payload.fcmOptions?.link || payload.data?.link
   
   // Customize notification here
   const notificationTitle = payload.notification.title
   const notificationOptions = {
      body: payload.notification.body,
      icon: "/firebase-logo.png",
      data: {
         url: link,
      },
   }

   self.registration.showNotification(notificationTitle, notificationOptions)
})

self.addEventListener("notificationclick", (event) => {
   console.log("[firebase-messaging-sw.js] Notification click received.")

   event.notification.close()

   // This checks if the client is already open and if it is, it focuses on the tab. If it is not open, it opens a new tab with the URL passed in the notification payload

   event.waitUntil(
      clients.matchAll({ type: "window", includedUnconstrolled: true }).then((clientList) => {
         const url = event.notification.data.url

         if (!url) return

         // If relative URL is passed in firebase console or API route handler, it may open a new window as the client.url is the full URL i.e. https://example.com/ and the url is /about whereas if we passed in the full URL, it will focus on the existing tab i.e. https://example.com/about
         for (const client of clientList) {
            if (client.url === url && "focus" in client) {
               return client.focus()
            }
         }

         if (clients.openWindow) {
            console.log("OPEN WINDOW ON CLIENT")
            return clients.openWindow(url)
         }
      }),
   )
})
