import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Movies from './pages/Movies'
import MovieDetails from './pages/MovieDetails'
import SeatLayout from './pages/SeatLayout'
import MyBookings from './pages/MyBookings'
import Favorite from './pages/Favorite'
import { Toaster } from 'react-hot-toast'    //<Toaster /> is a React component from the react-hot-toast library.     It renders the popup UI for toast notifications (like success or error messages).    Without it, toast() calls won't show anything on screen.
import Footer from './components/Footer'

//admin
import Layout from './pages/admin/Layout'
import Dashboard from './pages/admin/Dashboard'
import AddShows from './pages/admin/AddShows'
import ListShows from './pages/admin/ListShows'
import ListBookings from './pages/admin/ListBookings'

import { useAppContext } from './context/AppContext'
import Loading from './components/Loading'
import { SignIn } from '@clerk/clerk-react'





const App = () => {

  
/*

this line  Meaning:

1. useLocation()     This comes from react-router-dom.  It tells you the current URL after  the domain the user is on.

Example:
If user is on http://localhost:5173/movies → useLocation().pathname = "/movies"
If user is on http://localhost:5173/admin/list-shows → useLocation().pathname = "/admin/list-shows"

2. .startsWith('/admin')
This checks if the current path begins with /admin.
"/admin/list-shows".startsWith('/admin') → ✅ true
"/movies".startsWith('/admin') → ❌ false



✅ Simple Answer:  why outside return
Because you can't use hooks like useLocation() inside return or JSX.
Hooks must be called at the top level of a functional component.

*/


  const isAdminRoute = useLocation().pathname.startsWith('/admin')
  const { user } = useAppContext()


  return (
    <>
    <Toaster/>

    {/*
    You write <Toaster /> once in your app, usually at the top level.
    Then, anywhere in your code, if you write toast.success("Booked!"), 
    a small green popup will appear on the screen saying "Booked!" 
    — because <Toaster /> is there to show it.



    We place <Toaster /> at the top level (like in App.jsx) so that:

✅ It’s available throughout the whole app.
✅ Any toast message from any page or component can be displayed.
❌ If you put it deep inside a component, toasts from other places won’t show.    
    */}



    {!isAdminRoute && <Navbar/>}                   {/*➡️ “If isAdminRoute is false, then show the <Navbar /> component.”   In simple words:   ✅ Show Navbar only on non-admin pages.     ❌ Hide it when the URL starts with /admin. */}

     <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/movies' element={<Movies/>} />
      <Route path='/movies/:id' element={<MovieDetails/>} />
      <Route path='/movies/:id/:date' element={<SeatLayout/>} />
      <Route path='/my-bookings' element={<MyBookings/>} />
      <Route path='/loading/:nextUrl' element={<Loading/>} />            {/*  thsi is for the 8sec spin of the loading button for paynent to process */} 
      <Route path='/favorite' element={<Favorite/>} />
 

      
      {/*admin ---routes      and     here  first we do that if signed in or  not  if not sighned in then aign in then it will redirect back to whatever admin url u are in*/}
        <Route path='/admin/*' element={user ? <Layout/> : (
          <div className='min-h-screen flex justify-center items-center'>
            <SignIn fallbackRedirectUrl={'/admin'} />
          </div>
        )}> 

          <Route index element={<Dashboard/>}/>
          <Route path="add-shows" element={<AddShows/>}/>
          <Route path="list-shows" element={<ListShows/>}/>
          <Route path="list-bookings" element={<ListBookings/>}/>

        </Route>

 
      
     </Routes>
    {!isAdminRoute && <Footer />}

    </>
  )
}

export default App

/*
so every page will have navbar and footer except /admin   try localhost:5173/movies   or  /lala  it is there    but /admin we wont see
*/








