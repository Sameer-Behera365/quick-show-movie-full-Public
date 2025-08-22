import React, { useEffect } from 'react'
import AdminNavbar from '../../components/admin/AdminNavbar'
import AdminSidebar from '../../components/admin/AdminSidebar'
import { Outlet } from 'react-router-dom'
import Loading from '../../components/Loading'
import { useAppContext } from '../../context/AppContext'


const Layout = () => {

  const {isAdmin, fetchIsAdmin} = useAppContext()

  useEffect(()=>{
    fetchIsAdmin()
  },[])
 
  return  isAdmin? (
    <>
      <AdminNavbar />
 
      <div className='flex'>

      <AdminSidebar/>

        <div className='flex-1 px-4 py-10 md:px-10 h-[calc(100vh-64px)] overflow-y-auto'>     
            <Outlet />
        </div>

      </div>
 

    </>
  ) :<Loading/>
}

export default Layout



/*

import { Outlet } from 'react-router-dom'      
Outlet → placeholder where nested routes render.
Example: /admin/add-shows will load <AddShows/> inside this outlet.


When do we use <Outlet />?
We use <Outlet /> only when we have nested routes.







Classes meaning:-    
<div className="flex-1 px-4 py-10 md:px-10 h-[calc(100vh-64px)] overflow-y-auto">

flex-1 → In a flex container, this element will take up all remaining available space.
px-4 → Horizontal padding (left & right) = 1rem on small screens.
py-10 → Vertical padding (top & bottom) = 2.5rem.
md:px-10 → On medium screens or larger, horizontal padding increases to 2.5rem.
h-[calc(100vh-64px)] → Height = full browser window height minus 64px (used because navbar height is 64px, so content fits below it).
overflow-y-auto → Adds a vertical scrollbar if content is taller than the container.




that calc means:-

1. h-[ ... ] (Tailwind custom value)
Tailwind has fixed height classes like h-10, h-screen (100vh), etc.
But when you want a custom calculation, you wrap it in square brackets [...].

2. calc(100vh - 64px) (CSS)
100vh → means 100% of the viewport height (full browser window height).
- 64px → subtracts 64px (in this case, the navbar’s height).
Final result: height of this div = full screen height minus 64 pixels.

3. Why needed here?
The AdminNavbar at the top takes 64px of space.
If you just used h-screen (full height), the content would overlap behind the navbar.
Using calc(100vh - 64px) makes the content perfectly fit below the navbar without overflow
basivcally utilixzse the whole space below navabar  

tahts why we didt use h-10 h-20  why waste space so taht why h-cal  we did



*/