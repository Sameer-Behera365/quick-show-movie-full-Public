// import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { MenuIcon, SearchIcon, TicketPlus, XIcon } from 'lucide-react'    //we need this for icons
import React, { useState } from 'react'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'






//ok look navbar has 3 columns   1st column is logo  and 2nd column is menu items   and 3rd column is search icon and login button
const Navbar = () => {

const [isOpen, setIsOpen] = useState(false)     //initially false 
const {user} = useUser()
const {openSignIn} = useClerk()
const navigate = useNavigate()



/*
use of the isOpen  and setIsOpen:--->
Variable 	               Purpose

isOpen	                 Checks whether the mobile nav is open
setIsOpen                Toggles open/close when clicking icons
MenuIcon	               Opens the menu (isOpen = true)
XIcon	                   Closes the menu (isOpen = false)

📱 On small screens, clicking the MenuIcon (☰) → sets isOpen = true → menu opens.
❌ Clicking the XIcon → sets isOpen = false → menu closes.

*/





return (
<div className='fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-5'>

{/*----------------------- 1st column------------------------------ */}.

        <Link to='/' className='max-md:flex-1'>
          <img src={assets.logo} alt="" className='w-36 h-auto'/>         {/*  here h-auto means It lets the element’s height adjust automatically based on its content. */} 
          
          {
          /*  
           <Link to='/'  means homepage

          🔸 max-md:--> This means:
          “Only apply the style on small screens (medium and below, i.e., width ≤ 768px).”


          here flex-1 means:-
          “Let this item take equal available space inside a flex container.”
          If there are two or more items in a flex row and you give one of them flex-1, 
          it will stretch to fill the space equally.
          
          
          here  w-36 means:-
          w-36 sets the image width to 9rem (144px) — and this width stays the same on all screens  
          

          here  h-auto means:-
          Automatically adjust the height to match the image’s natural shape.
          It keeps the aspect ratio correct — no squishing or stretching.
          */}
        </Link>



{/*---------------------- 2nd column------------------------------ */}

      <div className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:font-medium max-md:text-lg z-50 flex flex-col md:flex-row items-center max-md:justify-center gap-8 min-md:px-8 py-3 max-md:h-screen min-md:rounded-full backdrop-blur bg-black/70 md:bg-white/10 md:border border-gray-300/20 overflow-hidden transition-[width] duration-300 ${isOpen ? 'max-md:w-full' : 'max-md:w-0'}`}>    {/* explained  in docs */}

        <XIcon className='md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer' onClick={()=> setIsOpen(!isOpen)}/>   {/* only show in small screens and Hide on medium and larger screens (≥768px)   ,   absolute: Position the icon independently inside its container.    ,  24px down from the top (top-6)     and   24px in from the right (right-6)    So it appears in the top-right corner, often used to close mobile menus or sidebars.    ,   Width and height = 1.5rem (24px)    ,    When you hover, the mouse becomes a hand icon, meaning it’s clickable.    */}          {/*  shows a close (X) icon — used to close menus, modals, or sidebars. */}

        <Link onClick={()=> {scrollTo(0,0); setIsOpen(false)}} to='/'>Home</Link>                   {/* The semicolon separates multiple statements inside the {} block , here  we are using 2 functions inside onClick   */}
        <Link onClick={()=> {scrollTo(0,0); setIsOpen(false)}} to='/movies'>Movies</Link>
        <Link onClick={()=> {scrollTo(0,0); setIsOpen(false)}} to='/'>Theaters</Link>
        <Link onClick={()=> {scrollTo(0,0); setIsOpen(false)}} to='/'>Releases</Link>
        <Link onClick={()=> {scrollTo(0,0); setIsOpen(false)}} to='/favorite'>Favorites</Link>

      </div>  



{/* -----------------3rd column----------------------------- */}



<div className='flex items-center gap-8'>            {/* ➡️ Adds space between the child elements inside the flex row.   gap-8 = 2rem = 32px of spacing between each item. */}
  <SearchIcon className='max-md:hidden w-6 h-6 cursor-pointer'/>      {/*hidden on small screen and width and height is 1.5rem also on hover we get hand as the cursor  */}
  {
    !user ?(
        <button onClick={openSignIn} className='px-4 py-1 sm:px-7 sm:py-2 bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer'>Login</button>

    ):(

      <UserButton>
        <UserButton.MenuItems>
            <UserButton.Action label="My Bookings" labelIcon={<TicketPlus width={15}/>} onClick={()=> navigate('/my-bookings')}/>
        </UserButton.MenuItems>
      </UserButton>
      
    )
  }
</div>



<MenuIcon className='max-md:ml-4 md:hidden w-8 h-8 cursor-pointer' onClick={()=> setIsOpen(!isOpen)}/>    {/*   after all teh three columns we will add this icon   (☰)  in samller screens */}


{/* 
max-md:ml-4:----->
max-md: means the style applies on small screens only (screen ≤ 768px).

ml-4 = margin-left: 1rem (16px).
📌 So: On small screens, the element gets a left margin to push it slightly right.

🔹 md:hidden
md: means medium screens and up (≥768px).

hidden hides the element.
📌 So: Hide this element on medium and large screens, only show on small screens.

🔹 w-8 h-8
Width and height set to 2rem (32px) each.
📌 Makes it a square box (often used for icons or buttons).

🔹 cursor-pointer
Changes mouse cursor to a pointer (hand icon) on hover.
📌 Means: “This element is clickable.”

*/
}


</div>    //end of the entire div container 

  )
}

export default Navbar












/*
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { MenuIcon, SearchIcon, TicketPlus, XIcon } from 'lucide-react'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { useAppContext } from '../context/AppContext'

const Navbar = () => {

 const [isOpen, setIsOpen] = useState(false)
 const {user} = useUser()
 const {openSignIn} = useClerk()

 const navigate = useNavigate()

 const {favoriteMovies} = useAppContext()

  return (
    <div className='fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-5'>
      <Link to='/' className='max-md:flex-1'>
        <img src={assets.logo} alt="" className='w-36 h-auto'/>
      </Link>

      <div className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:font-medium max-md:text-lg z-50 flex flex-col md:flex-row items-center max-md:justify-center gap-8 min-md:px-8 py-3 max-md:h-screen min-md:rounded-full backdrop-blur bg-black/70 md:bg-white/10 md:border border-gray-300/20 overflow-hidden transition-[width] duration-300 ${isOpen ? 'max-md:w-full' : 'max-md:w-0'}`}>

        <XIcon className='md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer' onClick={()=> setIsOpen(!isOpen)}/>

        <Link onClick={()=> {scrollTo(0,0); setIsOpen(false)}} to='/'>Home</Link>
        <Link onClick={()=> {scrollTo(0,0); setIsOpen(false)}} to='/movies'>Movies</Link>
        <Link onClick={()=> {scrollTo(0,0); setIsOpen(false)}} to='/'>Theaters</Link>
        <Link onClick={()=> {scrollTo(0,0); setIsOpen(false)}} to='/'>Releases</Link>
       {favoriteMovies.length > 0 && <Link onClick={()=> {scrollTo(0,0); setIsOpen(false)}} to='/favorite'>Favorites</Link>}
      </div>

    <div className='flex items-center gap-8'>
        <SearchIcon className='max-md:hidden w-6 h-6 cursor-pointer'/>
        {
            !user ? (
                <button onClick={openSignIn} className='px-4 py-1 sm:px-7 sm:py-2 bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer'>Login</button>
            ) : (
                <UserButton>
                    <UserButton.MenuItems>
                        <UserButton.Action label="My Bookings" labelIcon={<TicketPlus width={15}/>} onClick={()=> navigate('/my-bookings')}/>
                    </UserButton.MenuItems>
                </UserButton>
            )
        }
        
    </div>

    <MenuIcon className='max-md:ml-4 md:hidden w-8 h-8 cursor-pointer' onClick={()=> setIsOpen(!isOpen)}/>

    </div>
  )
}

export default Navbar



*/