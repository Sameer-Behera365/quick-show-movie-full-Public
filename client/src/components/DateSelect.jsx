import React, { useState } from 'react'
import BlurCircle from './BlurCircle'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const DateSelect = ({ dateTime, id }) => {

  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)       // 📦 Holds the currently selected date  --> on the pink color datesm are there na it will select the one which u click     and  also we will change the select on clicking those dates



  

  const onBookHandler = () => {                        // 🧠 When "Book Now" is clicked   
    if (!selected) {
      return toast('Please select a date')             // Show pop up aler like if no date selected  as we used toast
    }
    navigate(`/movies/${id}/${selected}`)              // Go to booking page   ex:-http://localhost:5173/movies/1232546/2025-07-26
    scrollTo(0, 0)                                     // Scroll to top
  }





  return (

    
    // 🧱 Outer wrapper for spacing and section anchor
    <div id='dateSelect' className='pt-30'>
      
      {/* 🔲 Box with blur and border styling */}
      <div className='flex flex-col md:flex-row items-center justify-between gap-10 relative p-8 bg-primary/10 border border-primary/20 rounded-lg'>
        
        {/* 🔴 Decorative blur circles */}
        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle top="100px" right="0px" />

        {/* 📅 Date selection UI */}
        <div>
          <p className='text-lg font-semibold'>Choose Date</p>   {/*choose date  */}
 


          <div className='flex items-center gap-6 text-sm mt-5'>     {/* flex row  here we use */}
            
            {/* ◀️ Left arrow */}
            <ChevronLeftIcon width={28} />




            
            {/* 🔢 List of available dates */}
            <span className='grid grid-cols-3 md:flex flex-wrap md:max-w-lg gap-4'>

{/*

🔍 Class-by-Class Explanation (in simple words):

grid
→ Uses a grid layout by default (on small screens). This means items are placed in a grid-like structure.


grid-cols-3
→ Creates 3 columns in the grid layout. So, items will automatically go into 3 side-by-side columns.


md:flex
→ On medium screens and larger (like tablets/laptops), it switches from grid to flex layout.
So below 768px → Grid.
From 768px and up → Flexbox.


flex-wrap
→ Used with flex layout to let items wrap to the next line if there's not enough space.


md:max-w-lg
→ On medium screens and up, the maximum width of this span will be lg size (which is 32rem or 512px).


gap-4
→ Adds spacing between items in both grid and flex layouts.
 */}


              {Object.keys(dateTime).map((date) => (


                /*
                
                Object.keys(dateTime).map((date) => (......  )  =====>    this is basically  Mapping over dateTime object     
                
                
                Object.keys(dateTime) gets an array of all keys from your dummyDateTimeData.

[
  "2025-07-24T10:45:00Z",
  "2025-07-25T10:45:00Z",
  ...
]
.map((date) => (...)) loops over each of these.

*/




//one  button  fully--------------------------------------------------------------------------------------
                  <button 
                  onClick={()=> setSelected(date)} 
                  key={date} 
                  className={`flex flex-col items-center justify-center h-14 w-14 aspect-square rounded cursor-pointer ${selected === date ? "bg-primary text-white" : "border border-primary/70"}`}
                  >


                  <span>{new Date(date).getDate()}</span>
                  
{ /*

✅ Step-by-Step What Happens:
You have a date value     Example: "2025-07-19T10:45:00Z"
→ This is a string representing a full date and time.

new Date(date) runs
→ JavaScript converts the string into a Date object.
→ Internally looks like: Sat Jul 19 2025 16:15:00 GMT+0530 (India Standard Time)

.getDate() is called on the Date object
→ This extracts the day of the month (e.g., 19).

*/}



                  <span>{new Date(date).toLocaleDateString('en-US', { month: 'short' })}</span>
                  {/*
                    ✅ What Happens Step by Step:
You have a date string
Example: "2025-07-19T10:45:00Z"

new Date(date) converts the string
→ Converts it into a JavaScript Date object.

.toLocaleDateString('en-US', { month: 'short' }) runs
→ Tells JavaScript:

Use U.S. English formatting ('en-US')

Show only the month, in short form (like Jul, Aug, Dec)
                    
                  */ }


                </button>   //end of button tsag ---------------------------------------------------------------------------------------
              ))}


            </span>

 {/*  what each part does here :-->



👉Creates a grid of 3 columns on small screens, switches to a flex row on medium and larger screens, allows wrapping, and adds spacing between buttons.
<span className='grid grid-cols-3 md:flex flex-wrap md:max-w-lg gap-4'>



👉 Loops through each date string in the dateTime object (like "2025-07-24").
{Object.keys(dateTime).map((date) => (
 
 
  */}





            {/* ▶️ Right arrow (currently no click handler) */}
            <ChevronRightIcon width={28} />
          </div>
        </div>

        {/* ✅ Book Now button */}
        <button onClick={onBookHandler} className='bg-primary text-white px-8 py-2 mt-6 rounded hover:bg-primary/90 transition-all cursor-pointer'>
          Book Now
        </button>
      </div>
    </div>
  )
}

export default DateSelect








/* 
imp:-

✅ here id is declared:
It’s received as a prop: ({ dateTime, id })

❌ Where id is used:
Nowhere — not in JSX, not in any function, not in a console.log.

✅ So what to do?
If you're not using it:

You can remove id from the parameter:


*/ 
