
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { dummyDateTimeData, dummyShowsData } from '../assets/assets'
import BlurCircle from '../components/BlurCircle'
import { Heart, PlayCircleIcon, StarIcon } from 'lucide-react'
import timeFormat from '../lib/timeFormat'
import MovieCard from '../components/MovieCard'
import toast from 'react-hot-toast'
import DateSelect from '../components/DateSelect'


// import Loading from '../components/Loading'
// import { useAppContext } from '../context/AppContext'





const MovieDetails = () => {

  const {id} = useParams()     //for getting the id value from url
  const [show, setShow] = useState(null)

  const getShow = async()=>{
    const lala=dummyShowsData.find(show=> show._id  === id )
    setShow({
      movie:lala,
      dateTime:dummyDateTimeData
    })
  }

  //here in dummy data wew will use teh same datetime values for all movies

  useEffect(()=>{
    getShow()
  },[id])




//--------returning 

return show?(
  
  <div className='px-6 md:px-16 lg:px-40 pt-30 md:pt-50'>     {/* ⬇️ Top layout: Poster + Details side by side on desktop, stacked on mobile */}
    <div className='flex flex-col md:flex-row gap-8 max-w-6xl mx-auto'>   
    
    
     {/* ⬅️ Movie Poster */}
      <img 
        src={show.movie.poster_path}        
/*
understand   :-   show.movie.poster_path

show is your state variable from useState

It holds an object with:
movie: movie data
dateTime: date/time info

You access parts of it like show.movie.title, show.movie.poster_path, etc. 
*/
        alt="" 
        className='max-md:mx-auto rounded-xl h-104 max-w-70 object-cover'
      />





      {/* ➡️ Movie Details Section */}
      <div className='relative flex flex-col gap-3'>       {/*   🧠 Meaning of relative:When you add relative to a parent element, it tells the browser:         “Hey, if any child uses absolute, position it relative to me, not the whole page.”      but we are not using any asbsolute here so it of no use us can remobe it its justr for info*/}
        <BlurCircle top="-100px" left="-100px"/>

        <p className='text-primary'>ENGLISH</p>            {/* Language */}

        <h1 className='text-4xl font-semibold max-w-96 text-balance'>             {/* Movie Title */}
          {show.movie.title}
        </h1>


        <div className='flex items-center gap-2 text-gray-300'>                  {/* User Rating */}
          <StarIcon className="w-5 h-5 text-primary fill-primary"/>
          {show.movie.vote_average.toFixed(1)} User Rating
        </div>


        <p className='text-gray-400 mt-2 text-sm leading-tight max-w-xl'>          {/* Overview */}
          {show.movie.overview}
        </p>



        <p>           {/* Runtime • Genres • Year */}
          {timeFormat(show.movie.runtime)} • {show.movie.genres.map(genre => genre.name).join(", ")} • {show.movie.release_date.split("-")[0]}
        </p>


  
        {/* Buttons: Trailer, Buy Tickets, Heart */}
        <div className='flex items-center flex-wrap gap-4 mt-4'>   {/*  bu default flex is row  */}
          
          {/* ▶️ Watch Trailer Button */}
          <button className='flex items-center gap-2 px-7 py-3 text-sm bg-gray-800 hover:bg-gray-900 transition rounded-md font-medium cursor-pointer active:scale-95'>
            <PlayCircleIcon className="w-5 h-5"/>
            Watch Trailer
          </button>

          {/* 🎟 Buy Tickets Button */}
          <a href="#dateSelect" className='px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer active:scale-95'>     {/*  scale-95 → Shrinks the element to 95% of its original size (a little smaller).active: → Only applies that when the element is being clicked or tapped. */}
            Buy Tickets
          </a>



            {/* ❤️ Favorite Button */}
          <button  className='bg-gray-700 p-2.5 rounded-full transition cursor-pointer active:scale-95'>      {/*     active: → When the user clicks and holds the element      scale-95 → Shrink the element to 95% of its original size */}
            <Heart/>
          </button>

        </div>
      </div>
    </div>



{/* ⭐ Cast Section Title */}
<p className='text-lg font-medium mt-20'>Your Favorite Cast</p>



{/* 🖼️ Cast Images Scrollable Row */}
<div className='overflow-x-auto no-scrollbar mt-8 pb-4'>       {/*  overflow-x-auto means  📦 Real Example:  Imagine you have a row of 15 cast cards side by side:   If the screen is too small to show all 15 cards, this class:  Does NOT cut them off   Instead, it adds a horizontal scroll bar so you can swipe/scroll left–right */}
  <div className='flex items-center gap-4 w-max px-4'>      {/* flex in row  */}
    {

      show.movie.casts.slice(0, 12).map((cast, index) => (            //max 12 memebers
      <div key={index} className='flex flex-col items-center text-center'>
        <img 
          src={cast.profile_path} 
          alt="" 
          className='rounded-full h-20 md:h-20 aspect-square object-cover'
        />
        <p className='font-medium text-xs mt-3'>{cast.name}</p>
      </div>
    ))
    
    }
  </div>
</div>





<DateSelect dateTime={show.dateTime} id={id}/>





</div>

) : <div>Loading...</div>
}

export default MovieDetails






/*
remember this is waht we did  in this :----->
<div className='px-6 md:px-16 lg:px-40 pt-30 md:pt-50'>     ⬇️ Top layout: Poster + Details side by side on desktop, stacked on mobile
<div className='flex flex-col md:flex-row gap-8 max-w-6xl mx-auto'>   ⬅️ Movie Poster


🔍 So what does this mean in plain English?

On small screens (mobile), we want:
[ Poster ]
[ Details ]


On bigger screens (tablet, desktop), we want:
[ Poster ]   [ Details ]

*/








/*
understand thsi :-   {show.movie.release_date.split("-")[0]}

Let’s say:    u have  show.movie.release_date = "2025-02-27"


🧠 What .split("-") does:

It breaks the string "2025-02-27" into an array:    ["2025", "02", "27"]
This splits the string wherever there's a -.

📦 Then [0] means:
Get the first item of that array:

*/









/*

🧠 In your code, you have:
<a href="#dateSelect" className="...">Buy Tickets</a>      ✅ What href="#dateSelect" means:

It tells the browser:
👉 “When this link is clicked, scroll to the element with id="dateSelect" on the same page.”


If that doesn't exist:
No error is shown.
But the page won’t scroll anywhere.
*/







/*

understand the index in js:-   index is provided by js


📌 Example:
const fruits = ["apple", "banana", "mango"];

fruits.map((fruit, index) => {
  console.log(fruit, index);
});


Output:
apple  0
banana 1
mango  2

*/









// -----------------------------------------------------------------------------------------------------------------dynamic  data code-----------------------------------
/*

import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { dummyDateTimeData, dummyShowsData } from '../assets/assets'
import BlurCircle from '../components/BlurCircle'
import { Heart, PlayCircleIcon, StarIcon } from 'lucide-react'
import timeFormat from '../lib/timeFormat'
import DateSelect from '../components/DateSelect'
import MovieCard from '../components/MovieCard'
import Loading from '../components/Loading'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const MovieDetails = () => {

  const navigate = useNavigate()
  const {id} = useParams()
  const [show, setShow] = useState(null)

  const {shows, axios, getToken, user, fetchFavoriteMovies, favoriteMovies, image_base_url} = useAppContext()

  const getShow = async ()=>{
    try {
      const { data } = await axios.get(`/api/show/${id}`)
      if(data.success){
        setShow(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleFavorite = async ()=>{
    try {
      if(!user) return toast.error("Please login to proceed");

      const { data } = await axios.post('/api/user/update-favorite', {movieId: id}, {headers: { Authorization: `Bearer ${await getToken()}` }})

      if(data.success){
        await fetchFavoriteMovies()
        toast.success(data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(()=>{
    getShow()
  },[id])

  return show ? (
    <div className='px-6 md:px-16 lg:px-40 pt-30 md:pt-50'>
      <div className='flex flex-col md:flex-row gap-8 max-w-6xl mx-auto'>

        <img src={image_base_url + show.movie.poster_path} alt="" className='max-md:mx-auto rounded-xl h-104 max-w-70 object-cover'/>

        <div className='relative flex flex-col gap-3'>
          <BlurCircle top="-100px" left="-100px"/>
          <p className='text-primary'>ENGLISH</p>
          <h1 className='text-4xl font-semibold max-w-96 text-balance'>{show.movie.title}</h1>
          <div className='flex items-center gap-2 text-gray-300'>
            <StarIcon className="w-5 h-5 text-primary fill-primary"/>
            {show.movie.vote_average.toFixed(1)} User Rating
          </div>

          <p className='text-gray-400 mt-2 text-sm leading-tight max-w-xl'>{show.movie.overview}</p>

          <p>
            {timeFormat(show.movie.runtime)} • {show.movie.genres.map(genre => genre.name).join(", ")} • {show.movie.release_date.split("-")[0]}
          </p>

          <div className='flex items-center flex-wrap gap-4 mt-4'>
            <button className='flex items-center gap-2 px-7 py-3 text-sm bg-gray-800 hover:bg-gray-900 transition rounded-md font-medium cursor-pointer active:scale-95'>
              <PlayCircleIcon className="w-5 h-5"/>
              Watch Trailer
              </button>
            <a href="#dateSelect" className='px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer active:scale-95'>Buy Tickets</a>
            <button onClick={handleFavorite} className='bg-gray-700 p-2.5 rounded-full transition cursor-pointer active:scale-95'>
              <Heart className={`w-5 h-5 ${favoriteMovies.find(movie => movie._id === id) ? 'fill-primary text-primary' : ""} `}/>
            </button>
          </div>
        </div>
      </div>

      <p className='text-lg font-medium mt-20'>Your Favorite Cast</p>
      <div className='overflow-x-auto no-scrollbar mt-8 pb-4'>
        <div className='flex items-center gap-4 w-max px-4'>
          {show.movie.casts.slice(0,12).map((cast,index)=> (
            <div key={index} className='flex flex-col items-center text-center'>
              <img src={image_base_url + cast.profile_path} alt="" className='rounded-full h-20 md:h-20 aspect-square object-cover'/>
              <p className='font-medium text-xs mt-3'>{cast.name}</p>
            </div>
          ))}
        </div>
      </div>

      <DateSelect dateTime={show.dateTime} id={id}/>

      <p className='text-lg font-medium mt-20 mb-8'>You May Also Like</p>
      <div className='flex flex-wrap max-sm:justify-center gap-8'>
          {shows.slice(0,4).map((movie, index)=> (
            <MovieCard key={index} movie={movie}/>
          ))}
      </div>
      <div className='flex justify-center mt-20'>
          <button onClick={()=> {navigate('/movies'); scrollTo(0,0)}} className='px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer'>Show more</button>
      </div>

    </div>
  ) : <Loading />
}

export default MovieDetails









*/