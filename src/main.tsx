import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { Provider } from "react-redux"
import { store } from "@/redux/store"
import { ThemeProvider } from "@/features/global-components/shared/Theme-Provider"
import { Toaster } from "@/features/global-components/ui/sonner"

ReactDOM.createRoot(document.getElementById("root")!).render(
   <Provider store={store}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
         <Toaster richColors={true} toastOptions={{}} position="top-center" />
         <App />
      </ThemeProvider>
   </Provider>,
)
