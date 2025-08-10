import { LayoutDashboardIcon, ListCollapseIcon, ListIcon, PlusSquareIcon } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets'

const AdminSidebar = () => {

    const user = {
        firstName: 'Admin',
        lastName: 'User',
        imageUrl: assets.profile,
    }


    //sidebar will have links in it
    const adminNavlinks = [
        { name: 'Dashboard', path: '/admin', icon: LayoutDashboardIcon },
        { name: 'Add Shows', path: '/admin/add-shows', icon: PlusSquareIcon },
        { name: 'List Shows', path: '/admin/list-shows', icon: ListIcon },
        { name: 'List Bookings', path: '/admin/list-bookings', icon: ListCollapseIcon },
    ]






 return (
  // Sidebar container: fixed height (full screen minus navbar height), flex column layout,     // center-aligned items, padding top, fixed width, and right border
  <div className='h-[calc(100vh-64px)] flex flex-col  items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-gray-300/20 text-sm'>   {/* This div makes a full-height (minus navbar) vertical sidebar, centers its items horizontally, adds top padding, keeps it narrow on mobile (max-w-13) and wider on desktop (md:max-w-60), full width within that limit, with a right border and small text. */}   {/* no need justuify ecnetre it will align completly centre  so no need */}

    <img className='h-9 md:h-14 w-9 md:w-14 rounded-full mx-auto' src={user.imageUrl} alt="sidebar" />

    <p className='mt-2 text-base max-md:hidden'>{user.firstName} {user.lastName}</p>

 

    {/* Container for sidebar navigation links */}
    <div className='w-full'>
      {adminNavlinks.map((link, index) => (
        
        // NavLink: handles routing, adds active styling when current URL matches
        <NavLink
          key={index}
          to={link.path}
          end
          className={({ isActive }) =>
            `relative flex items-center max-md:justify-center gap-2 w-full py-2.5 min-md:pl-10 first:mt-6 text-gray-400 ${
              isActive && 'bg-primary/15 text-primary group'
            }`
          }
        >


 

          {({ isActive }) => (
            <>
              {/* Icon for each link */}
              <link.icon className="w-5 h-5" />
              
              {/* Link text, hidden on mobile */}
              <p className="max-md:hidden">{link.name}</p>
              
              {/* Vertical indicator bar when link is active */}
              <span className={`w-1.5 h-10 rounded-l right-0 absolute ${isActive && 'bg-primary'}`} />      
            </>
          )}


          
        </NavLink>
      ))}
    </div>
  </div>
)





}

export default AdminSidebar




 


/*

look u can name it anything not nexessarily  isActive    u can name is whatever u want its jsut a parameter 
*/





/*
meaning:-   <span className={`w-1.5 h-10 rounded-l right-0 absolute ${isActive && 'bg-primary'}`} />      


absolute → Positions it relative to the NavLink (which has relative).
rounded-l → Rounds only the left edge of the rectangle.
right-0 → Positions it to the far right of the NavLink.






*/