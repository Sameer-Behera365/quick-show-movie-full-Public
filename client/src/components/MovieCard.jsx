//we afe passing props here , so we pass movie here and this will get each movie info like   id ,date,context...everyting and  it will dipaly it    so its likek a reusable component also calleed  movie card



import { StarIcon } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import timeFormat from '../lib/timeFormat'
import { useAppContext } from '../context/AppContext'





const MovieCard = ({movie}) => {

    const navigate = useNavigate()
    const {image_base_url} = useAppContext()




  return (
    <div className='flex flex-col justify-between p-3 bg-gray-800 rounded-2xl hover:-translate-y-1 transition duration-300 w-66'>     {/*Makes a vertical flex container with space-between layout, padding, dark background, rounded corners, upward hover animation with smooth transition, and fixed width (w-66 is likely a custom width class). */}



      {/* image  on cliclicking we redirect  */}

      <img onClick={()=> {navigate(`/movies/${movie._id}`); scrollTo(0, 0)}}
       src={image_base_url + movie.backdrop_path} alt="" className='rounded-lg h-52 w-full object-cover object-right-bottom cursor-pointer'/> {/*→ Makes an image with large rounded corners, fixed height (13rem), full width  it means complete width of parent div, cover-fit scaling, aligned to the bottom-right, and shows a pointer cursor on hover */}







      {/* descriptinon and time and date and runtime */}

       <p className='font-semibold mt-2 truncate'>{movie.title}</p>         {/*→ Sets semi-bold text, adds top margin (0.5rem), and truncates overflowing text with ellipsis (...) if it doesn’t fit in one line. */}
       <p className='text-sm text-gray-400 mt-2'>
        {new Date(movie.release_date).getFullYear()} • {movie.genres.slice(0,2).map(genre => genre.name).join(" | ")} • {timeFormat(movie.runtime)}
       </p>






       {/* buy tickets button   for that we addead a little margin top    mt-4    and   padding  bottom  pb-3    adn on clicking we redirect  just like on clicking on image             and  rating star    at the end*/}

      <div className='flex items-center justify-between mt-4 pb-3'>
        <button onClick={()=> {navigate(`/movies/${movie._id}`); scrollTo(0, 0)}} className='px-4 py-2 text-xs bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer'>Buy Tickets</button>

        <p className='flex items-center gap-1 text-sm text-gray-400 mt-1 pr-1'>     {/* gap-1   means  Adds a gap of 0.25rem (4px) between items in a flex or grid container. */}
            <StarIcon className="w-4 h-4 text-primary fill-primary"/>
            {movie.vote_average.toFixed(1)}   
        </p>
      </div>




    </div>
  )
}

export default MovieCard




/*
you can just write rounded, but it’s not the same as rounded-2xl.

Difference:
rounded → Applies the default small border-radius (usually 0.25rem or 4px).
rounded-2xl → Applies a larger border-radius (specifically 1rem or 16px).




duration-300
This sets the duration of the animation/transition to 300 milliseconds (0.3 seconds).



🎯 hover:-translate-y-1
translate-y moves the element up/down on the Y-axis.
-translate-y-1 moves it up by 0.25rem (4px).


*/











/*
what is image_base_url?

image_base_url typically refers to the starting part of a URL used 
to load images from a server or API — especially common in movie or media 
projects using APIs like TMDB.


Example (TMDB context):
const image_base_url = "https://image.tmdb.org/t/p/original";
So if the API gives you an image path like /xyz123.jpg, you can form the full image URL like:


const fullImageUrl = image_base_url + "/xyz123.jpg";



In short:
image_base_url is the constant part of an image link, to which dynamic image paths are added to load images.














look if u sing dummy data tehn we just do ilikr thsi
src={movie.backdrop_path}   it will work

*/









/*

👇 Suppose you have this genres array inside a movie object:
"genres": [
  { "id": 28, "name": "Action" },
  { "id": 14, "name": "Fantasy" },
  { "id": 12, "name": "Adventure" }
]

And this code:
{new Date(movie.release_date).getFullYear()} • {movie.genres.slice(0,2).map(genre => genre.name).join(" | ")} • {timeFormat(movie.runtime)}

🔍 Here's what it does, step-by-step:====>




new Date(movie.release_date).getFullYear()
→ Converts the movie’s release date (like "2021-05-14") to a Date object and gets just the year, e.g., 2021.


movie.genres.slice(0,2)
→ Takes only the first 2 genres from the array:
[{"Action"}, {"Fantasy"}].


.map(genre => genre.name)
→ Converts those objects to just their names:
["Action", "Fantasy"].


.join(" | ")
→ Joins the names with a pipe symbol:
"Action | Fantasy".



timeFormat(movie.runtime)
→ Calls a custom function timeFormat (you define this) that converts runtime in minutes (e.g., 126) into something like "2h 6m".


 */









/*

🔹 {movie.vote_average.toFixed(1)}

This is JavaScript inside JSX.
movie.vote_average might be something like 7.3456.
.toFixed(1) rounds it to 1 decimal place → 7.3.

*/