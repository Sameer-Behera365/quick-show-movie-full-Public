//now we need to make the movie cards right so for that we will write code here



import { ArrowRight } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import BlurCircle from './BlurCircle'
import MovieCard from './MovieCard'
import { dummyShowsData } from '../assets/assets'        //for dummy data  we using right 
// import { useAppContext } from '../context/AppContext'





const FeaturedSection = () => {

    const navigate = useNavigate()
    // const {shows } = useAppContext()

  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden'> {/*  remember width is 100percent by default when nothing is mentioned */} {/* Sets horizontal padding to 24px, 64px (≥768px), 96px (≥1024px), 176px (≥1280px), and hides overflow content:--content that goes outside the div's box will be clipped (not visible)  */}



  
     {/*  blur circle and now showing  and view all*/}

      <div className='relative flex items-center justify-between pt-20 pb-10'>{/*pt-20	---> Adds 80px padding at the top.           pb-10	---> 40px padding at the bottom. */}

        <BlurCircle top='0' right='-80px'/>      {/* we are sending props   top:0px         left:auto      bottom:auto              right: -80px  means  The element is moved 80px outward, outside the right edge. */}

        <p className='text-gray-300 font-medium text-lg'>Now Showing</p>                    {/* ➤ Light gray text, medium bold, large size (18px). */}

        <button onClick={()=> navigate('/movies')} className='group flex items-center gap-2 text-sm text-gray-300 cursor-pointer '>  {/*  ➤ Button as flex row, light gray small text (14px), pointer cursor, enables child hover effects via group. */}                  {/*  look i when on clicking view all arrow i need to see all movies so in order to show that i will redirect to another router  /movies */}
            View All 
            <ArrowRight className='group-hover:translate-x-0.5 transition w-4.5 h-4.5'/>   {/* ➤ On hover, arrow moves right slightly (2px), smooth transition, size 18×18px. */}
        </button>

      </div>






      {/* movie cards section */}
      <div className='flex flex-wrap max-sm:justify-center gap-8 mt-8'>    {/*look in small screens it will be wrapped in one colmn just to align evrything in one line colum  we do    justify-centre */}
        {dummyShowsData.slice(0, 4).map((show)=>(                     //only 4 shows we added u can add more no prob in that 
            <MovieCard key={show._id} movie={show}/>
        ))}
      </div>
      






     {/* show more button */}

      <div className='flex justify-center mt-20'>
        <button onClick={()=> {navigate('/movies'); scrollTo(0,0)}}   className='px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer'>Show more</button>
      </div>











  {/* trailers section on clicking we play the tailer  and  other trailers are also below taht */}














    </div>
  )
}

export default FeaturedSection









//remnber by default means flex row --------> justify-center centers items horizontally, while justify-between ------>pushes items to far left and right with space in between.


