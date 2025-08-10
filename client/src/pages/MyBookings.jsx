import React, { useEffect, useState } from 'react'
import { dummyBookingData } from '../assets/assets'
import Loading from '../components/Loading'
import BlurCircle from '../components/BlurCircle'
import timeFormat from '../lib/timeFormat'
import { Link } from 'react-router-dom'
import { dateFormat } from '../lib/dateFormat'
// import { useAppContext } from '../context/AppContext'





const MyBookings = () => {
    const currency = import.meta.env.VITE_CURRENCY


      const [bookings, setBookings] = useState([])       //booking will be empty array initially(or  also called bookings state is wmpty array)
      const [isLoading, setIsLoading] = useState(true)

      const getMyBookings=async()=>{
        setBookings(dummyBookingData)
        setIsLoading(false)
      }


      useEffect(()=>{
        getMyBookings()
      },[])











    return !isLoading ? (   //whenever   the loading is true we do  2nd one   else   1st    one


<div className='relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh]   '>   {/*  The class min-h-[80vh] is from Tailwind CSS. Meaning: min-h → sets the minimum height of an element. [80vh] → uses a custom value for minimum height (here 80vh). vh (viewport height) → 1vh = 1% of the height of the viewport (browser window). */}   {/* rermber if no width is mentioned then it takes whole container width */}
      
    {/*  remember :-
    Why did it look like it wasn’t full width?(i am talking aboutr carsds and blur circle )
    
    Because you added padding (px-6 md:px-16 lg:px-40) → that pushes 
    content inward, even though the outer box still 
    spans the full width.
    
     */}


      

      {/* Top blur decoration */}
      <BlurCircle top="100px" left="100px"/>



      {/* Bottom blur decoration */}
      <div>                                             
        <BlurCircle bottom="0px" left="600px"/>    
      </div>





      <h1 className='text-lg font-semibold mb-4'>My Bookings</h1>




      {bookings.map((item, index) => (         // Loop through each booking and render UI card 

<div 
  key={index} 
  className='flex flex-col md:flex-row justify-between bg-primary/8 border border-primary/20 rounded-lg mt-4 p-2 max-w-3xl'           //Creates a flex container that stacks children vertically on small screens and horizontally on medium+, spaces them out, gives a faint primary background and border, rounded corners, margin top, padding, and limits max width.       
>



{/* here what we stacking as chikldren   see here 2 children      1(left side:--->     image +  description taht si date time title)     and  2(right side :---->    amount , payment and seat details  )  */}
{/* justify-between is for the 1st  and  2nd children to justify   horizontal  in   flex-row    and      vertically  in flex-col */}





{/* --------------------------------------------------------------Left side: Poster and movie details ---------------------------------------*/}
          <div className='flex flex-col md:flex-row'>                   {/*  easy explanation  see    (movie poster )   and    ( title,duration,showtime)       to  be in   row wise  in big scrren  we used  flex -row  for that        and    we them in column wise in small screens  so we usee  flex-col               ,        u try urself by  removing   md:flex-row    u see teh difference    */}
            {/* Movie poster */}
            <img 
              src={ item.show.movie.poster_path} 
              alt="" 
              className='md:max-w-45 aspect-video h-auto object-cover object-bottom rounded'
            />

            {/* Title, duration, and showtime */}
            <div className='flex flex-col p-4'>
              <p className='text-lg font-semibold'>{item.show.movie.title}</p>
              <p className='text-gray-400 text-sm'>{timeFormat(item.show.movie.runtime)}</p>
              <p className='text-gray-400 text-sm mt-auto'>{dateFormat(item.show.showDateTime)}</p>
            </div>
          </div>


{/* -------------------------------------------------Right side: amount, payment, seat details */}



          <div className='flex flex-col md:items-end md:text-right justify-between p-4'>      {/* items-end   means   items are aligned to right  here items means the children which are direct to thsi div    , text-right  mrans text si right - aligned */}
            <div className='flex items-center gap-4'>
              <p className='text-2xl font-semibold mb-3'>{currency}{item.amount}</p>   
              {!item.isPaid && <Link to={item.paymentLink} className='bg-primary px-4 py-1.5 mb-3 text-sm rounded-full font-medium cursor-pointer'>Pay Now</Link>}   {/* we qwill diaply the button only if customer is still nty paid */}
            </div>

            <div className='text-sm'>
              <p><span className='text-gray-400'>Total Tickets:</span> {item.bookedSeats.length}</p>
              <p><span className='text-gray-400'>Seat Number:</span> {item.bookedSeats.join(", ")}</p>
            </div>
          </div>





        </div>      //  end  of map function  div  that is     {bookings.map((item, index) => (
      ))}           {/* end of map function */}

</div>



  ) : (<Loading/>)
}


export default MyBookings






/*
            <div className='flex flex-col p-4'>
              <p className='text-lg font-semibold'>{item.show.movie.title}</p>
              <p className='text-gray-400 text-sm'>{timeFormat(item.show.movie.runtime)}</p>
              <p className='text-gray-400 text-sm mt-auto'>{dateFormat(item.show.showDateTime)}</p>
            </div>













            

*/







