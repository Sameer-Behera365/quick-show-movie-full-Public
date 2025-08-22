// import { StrictMode } from 'react'  as we are not using stict mode
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import { AppProvider } from './context/AppContext.jsx'






  // Import your Publishable Key
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

  if (!PUBLISHABLE_KEY) {
    throw new Error('Add your Clerk Publishable Key to the .env file')
  }




  
/*   before app context

createRoot(document.getElementById('root')).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ClerkProvider>,

)
  
*/



//after app context

createRoot(document.getElementById('root')).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  </ClerkProvider>,
)




/*

Before vs After AppProvider:


Before AppContext:------------------------------------------------------------------------------------------------------------
Without the AppProvider, you’re just using 
ClerkProvider and BrowserRouter to handle authentication and routing.

After AppContext (AppProvider):---------------------------------------------------------------------------------------------------
With AppProvider, you wrap your entire app in 
the context provider. This allows AppProvider to pass down 
shared state like isAdmin, shows, and favoriteMovies to all components inside it.

and

It should be inside BrowserRouter
because you want all of your routes and pages to have access to the global state.






Here’s what happens:--------------------------------------------------------------------------------------------------------------------

AppProvider is wrapping your app, meaning any component inside AppProvider (like App) can access the global data stored in the context.
ClerkProvider is still managing user authentication.
BrowserRouter allows you to handle routing (page navigation).


Key Flow:

ClerkProvider handles authentication for the user (sign in, sign up, etc.).
AppProvider holds and shares data (like movies, admin status) across your app.
App is the main component that now has access to both authentication (from Clerk) and shared data (from AppContext).



Final Structure:

ClerkProvider handles user authentication.
AppProvider manages global app state and shares it across the app.
BrowserRouter handles routing in your app.


*/
