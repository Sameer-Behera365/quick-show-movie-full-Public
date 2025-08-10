import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Movies from './pages/Movies'
import MovieDetails from './pages/MovieDetails'
import SeatLayout from './pages/SeatLayout'
import MyBookings from './pages/MyBookings'
import Favorite from './pages/Favorite'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer'

//admin
import Layout from './pages/admin/Layout'
import Dashboard from './pages/admin/Dashboard'
import AddShows from './pages/admin/AddShows'
import ListShows from './pages/admin/ListShows'
import ListBookings from './pages/admin/ListBookings'



/*
<Toaster /> is a React component from the react-hot-toast library.

It renders the popup UI for toast notifications (like success or error messages).
Without it, toast() calls won't show anything on screen.

*/









const App = () => {

  const isAdminRoute = useLocation().pathname.startsWith('/admin')
  /*
  this line signifies:-
  ✅ Meaning:
It checks if the current URL path starts with /admin.

🔍 Breakdown:
useLocation() → A React Router hook that gives you the current URL location (like /admin/dashboard or /movies).
.pathname → Gives just the path part of the URL (e.g., /admin/list-shows).
.startsWith('/admin') → Checks if the path begins with /admin.

🎯 Why it's used:
To conditionally show or hide things like Navbar or Footer on admin pages.

For example:
{!isAdminRoute && <Navbar />}

This means:
➡️ “Only show the Navbar if we are NOT on an admin page”


and since u are using useLocation u need to import useLocation from react-router-dom.








✅ Simple Answer:  why outside return
Because you can't use hooks like useLocation() inside return or JSX.
Hooks must be called at the top level of a functional component.


  */


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




    {!isAdminRoute && <Navbar/>}                

    {/*➡️ “If isAdminRoute is false, then show the <Navbar /> component.”   In simple words:   ✅ Show Navbar only on non-admin pages.     ❌ Hide it when the URL starts with /admin. */}


     <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/movies' element={<Movies/>} />
      <Route path='/movies/:id' element={<MovieDetails/>} />
      <Route path='/movies/:id/:date' element={<SeatLayout/>} />
      <Route path='/my-bookings' element={<MyBookings/>} />
      <Route path='/favorite' element={<Favorite/>} />


      {/*admin */}
      <Route path='/admin/*' element={<Layout/> }>
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

















/*

import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Movies from './pages/Movies'
import MovieDetails from './pages/MovieDetails'
import SeatLayout from './pages/SeatLayout'
import MyBookings from './pages/MyBookings'
import Favorite from './pages/Favorite'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer'
import Layout from './pages/admin/Layout'
import Dashboard from './pages/admin/Dashboard'
import AddShows from './pages/admin/AddShows'
import ListShows from './pages/admin/ListShows'
import ListBookings from './pages/admin/ListBookings'
import { useAppContext } from './context/AppContext'
import { SignIn } from '@clerk/clerk-react'
import Loading from './components/Loading'

const App = () => {

  const isAdminRoute = useLocation().pathname.startsWith('/admin')

  const { user } = useAppContext()

  return (
    <>
      <Toaster />
      {!isAdminRoute && <Navbar/>}
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/movies' element={<Movies/>} />
        <Route path='/movies/:id' element={<MovieDetails/>} />
        <Route path='/movies/:id/:date' element={<SeatLayout/>} />
        <Route path='/my-bookings' element={<MyBookings/>} />
        <Route path='/loading/:nextUrl' element={<Loading/>} />

        <Route path='/favorite' element={<Favorite/>} />
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
*/