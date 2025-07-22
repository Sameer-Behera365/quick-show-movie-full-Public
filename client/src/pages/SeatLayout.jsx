

import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { assets, dummyDateTimeData, dummyShowsData } from '../assets/assets'
import Loading from '../components/Loading'
import { ArrowRightIcon, ClockIcon } from 'lucide-react'
import isoTimeFormat from '../lib/isoTimeFormat'
import BlurCircle from '../components/BlurCircle'
import toast from 'react-hot-toast'




const SeatLayout = () => {

  const navigate = useNavigate()


    // Seat rows divided into 5 groups
  const groupRows = [["A", "B"], ["C", "D"], ["E", "F"], ["G", "H"], ["I", "J"]]       //js  is flexible   u can create  arrays  like this  no  need different  synatx  lik in   c++





   
  const { id, date } = useParams()                                // 👉 Gets `id` and `date` from the URL (e.g., /book/123/2025-07-22)
  const [selectedTime, setSelectedTime] = useState(null)          // 👉 Stores the time selected by user (starts as null)
  const [show, setShow] = useState(null)                          // 👉 Stores the movie details                              
  const [selectedSeats, setSelectedSeats] = useState([])          // 👉 Stores which seats the user selects (array like ["A1", "A2"])
  const [occupiedSeats, setOccupiedSeats] = useState([])          // 👉 Stores seats already booked by others (disabled seats)
  



    /*
It searches the dummy show data for the movie with the matching _id.
If found, it sets the movie and dummy show times in the show state.
  */
  const getShow = async () => {
  const show = dummyShowsData.find(show => show._id === id)
  if (show) {
    setShow({
      movie: show,
      dateTime: dummyDateTimeData
    })
  }}





// Handle seat selection logic with validation   thsi It's called when a seat is clicked.

  const handleSeatClick = (seatId) =>{


 //Checks if the user has not selected a showtime yet.
  if (!selectedTime)  return toast("Please select time first")   



/*  meaning of thsi if block:-
If the seat is not already selected,
And the user has already picked 5 seats,
Then show a message: “You can only select 5 seats”.            
*/

if (!selectedSeats.includes(seatId) && selectedSeats.length > 4) 
        {  return toast("You can only select 5 seats")  }



//If the seat is already booked, we show a message: “This seat is already booked”.
if (occupiedSeats.includes(seatId)) return toast('This seat is already booked')   
      



      setSelectedSeats(prev =>                         //look here prev is automatically the last known value of selectedSeats.
        prev.includes(seatId)                          //prev is the previous value of selectedSeats.  Example: ["A1", "A2"]
        ? prev.filter(seat => seat !== seatId)          //  remove seat
        : [...prev, seatId]                             //  add seat
      )
}






  // Render seat buttons for a row
  const renderSeats = (row, count = 9)=> (
    <div key={row} className="flex gap-2 mt-2">                              {/*container  for the  wholw  row */}     {/* we have gap between seat rows  */}    {/* gap-2  means   horizontally  and  vertically gap  between its child elemnts  */}
        {
          
          Array.from({ length: count }, (_, i) =>        //expalin in docs about this fiunctioon
           {
          const seatId = `${row}${i + 1}`;
          return (
                <button key={seatId} 
                onClick={() => handleSeatClick(seatId)} 
                className={
                  `h-8 w-8 rounded border border-primary/60 cursor-pointer
                ${selectedSeats.includes(seatId) && "bg-primary text-white"} 
                ${occupiedSeats.includes(seatId) && "opacity-50"}`
                }>
                {seatId}
                </button>
           )
           }
           )
  
        }
      </div>
    
  )






//run once after page load
useEffect(() => {
  getShow()
}, [])


return show ? (
  // Main container where we will put available timings  and  seat select buttons
  <div className='flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-50'>  {/* Flex container with vertical layout (flex-col ) , switches to horizontal(flex-row) on medium screens, and applies increasing horizontal/top padding based on screen size. */}







{/*------------------------------------------------------------------- container where we will put available timings */} 

    <div className='w-60 bg-primary/10 border border-primary/20 rounded-lg py-10 h-max md:sticky md:top-30'>           {/* here /10 means 10 percent opacity */}                      {/*  In Tailwind (and CSS), sticky means:   The element scrolls like normal, but sticks (gets fixed) to a position (like top) once it reaches it — until its parent ends.   For example:   md:sticky md:top-30 */}
      <p className='text-lg font-semibold px-6'>Available Timings</p>      


      <div className='mt-5 space-y-1'>                                     {/*   space-y-1 = adds vertical gap between child elements inside the div */}             {/* List of showtimes */}
        {show.dateTime[date].map((item) => (                            //here js knows the meanong of date as we used const{ id , date} = useParams()   so yeah we got that from here           //  ✅the outer {}   is needed  as  The outer {} tells React:    "Hey! I'm about to write some JavaScript logic here (like .map()) inside this JSX block."  /*


/*
see array looks like this;-
 "2025-07-24": [
        { "time": "2025-07-24T01:00:00.000Z", "showId": "68395b407f6329be2bb45bd1" },
        { "time": "2025-07-24T03:00:00.000Z", "showId": "68395b407f6329be2bb45bd2" },
        { "time": "2025-07-24T05:00:00.000Z", "showId": "68395b407f6329be2bb45bd3" }
]

so we are basically iterating the available times of  a particular date 

 */
          
          <div
            key={item.time}
            onClick={() => setSelectedTime(item)} // set the selected time when clicked----->    remember here item means time  and show id   both  in  assets.js
            className={`flex items-center gap-2 px-6 py-2 w-max rounded-r-md cursor-pointer transition    
              ${selectedTime?.time === item.time ? "bg-primary text-white" : "hover:bg-primary/20"}`    //understand thsi part i wrote in docs
              }
          >
            

            {/* Clock icon next to time */}
            <ClockIcon className="w-4 h-4" />



            {/* Formatted time string */}
             <p className='text-sm'>{isoTimeFormat(item.time)}</p>  {/* itemtime   this  we will get time like this:---->    2025-07-26T01:00:00.000Z   ---->   so to convert it we will use isoTimeFormat  from lib/isoTimeFormat */}

          </div>

        ))}
      </div>
    </div>



{/* ----------------------------------------------------------------- ✅ Right section of page: Shows seat layout and booking button */}

<div className='relative flex-1 flex flex-col items-center max-md:mt-16'>     {/* here flex-1  means each child elemnt  takes equal space --->  so right section will strect its full parent container available space which is not utilized by left section that is available timings */}

  <BlurCircle top="-100px" left="-100px"/>                         
  <BlurCircle bottom="0" right="0"/>                              


  <h1 className='text-2xl font-semibold mb-4'>Select your seat</h1>     
  <img src={assets.screenImage} alt="screen" />                    {/* 🎥 Screen image  */}
  <p className='text-gray-400 text-sm mb-6'>SCREEN SIDE</p>      {/* text-sm  means smll text  and  mb-6 means   margin botooom  6*0.25= 1.5 rem*/}






  {/*=========> 🎫 All the seat rows will appear here <==========*/}
  <div className='flex flex-col items-center mt-10 text-xs text-gray-300'>  {/* This <div> creates a vertical layout that centers all content, adds top spacing, and applies small, light-gray text. */}            {/* text-xs = 0.75rem  means extra small */}
  



    {/* 🟡 First group of rows (e.g., front rows), displayed in grid */}
    <div className='grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 mb-6'>    {/*  this switches from flex to grid layout */}  {/* in movie view it will be 2 columns   while  in   dezsktop view it will be 1 column     soo  if excess  elelnnts come it will change to next line down it*/}
      {groupRows[0].map(row => renderSeats(row))}
    </div>





    {/* 🔵 Remaining seat rows, grouped and shown below first group */}
    <div className='grid grid-cols-2 gap-11'>                                    
      {groupRows.slice(1).map((group, idx) => (           //slice(1)   means  except 1st elemnt in array  we will select all other elemnnets in the array    ----->   Skips the first group (["A", "B"])   so  we have now as  this  [[“C”, “D”], [“E”, “F”], [“G”, “H”], [“I”, “J”]]
        <div key={idx}>
          {group.map(row => renderSeats(row))}            {/* here we wont need another div  but as we using map  so we need to give unique key */}
        </div>
      ))}
    </div>
  </div>
  {/*=========> 🎫 All the seat rows will appear here <==========*/}









  <button    //✅ Checkout Button at bottom
    onClick={()=> navigate('/my-bookings')}
    className='flex items-center gap-1 mt-20 px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer active:scale-95'
  >
    Proceed to Checkout
    <ArrowRightIcon strokeWidth={3} className="w-4 h-4"/>       {/*     strokeWidth={3} means the line inside the SVG icon will be thicker than default (default is usually 1 or 2).       Higher number = thicker outline. */}
  </button>



</div>   

</div>    //both sections (timing and seat done )




) : (<Loading />)          // 🔄 Loading spinner while show data is still loading
}


export default SeatLayout















/*

.includes(...) means: =====>    “Does this array contain this item?”      =====>   It returns either true or false.

🔹 Syntax:   array.includes(value)


🔹 Example:
const arr = ['A1', 'A2', 'A3'];

arr.includes('A2')   // ✅ true
arr.includes('B1')   // ❌ false

*/







/*
understand  menaning of  : =======================================================================================================

prev.includes(seatId)
  ? prev.filter(seat => seat !== seatId)         // remove seat
  : [...prev, seatId]                            // add seat

💡 Meaning:
If seat is already selected → ❌ remove it
If seat is not selected → ✅ add it


🧠 Example:
prev = ["A1", "A2"]
seatId = "A2" → result = ["A1"]                       // removed   //.filter ()   this is basically return all other seats apart from the selected one
seatId = "A3" → result = ["A1", "A2", "A3"]           // added




-----------------------------------------------------------------------------------------------------------------------------------------------------------------
🔹 Spread operator (...)
It copies the old array (prev) and adds a new item (seatId) at the end.

🔧 Example:
prev = ["A1", "A2"]
seatId = "A3"

[...prev, seatId] 
→ ["A1", "A2", "A3"]



prev is the previous array
...prev makes a copy (not reference)

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/




