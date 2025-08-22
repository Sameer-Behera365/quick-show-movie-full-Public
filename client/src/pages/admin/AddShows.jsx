import React, { useEffect, useState } from 'react'
import { dummyShowsData } from '../../assets/assets';
import Loading from '../../components/Loading';
import Title from '../../components/admin/Title';
import { CheckIcon, DeleteIcon, StarIcon } from 'lucide-react';
import { kConverter } from '../../lib/kConverter';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';




const AddShows = () => {

    const {axios, getToken, user, image_base_url} = useAppContext()


    const currency = import.meta.env.VITE_CURRENCY
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);   // movies which are playing currently we get frpm dummy data 
    const [selectedMovie, setSelectedMovie] = useState(null);       // selected movie id  we need thsi to display  bright color check box  on top - right of the movie poster  when we click the movie poster
    const [showPrice, setShowPrice] = useState("");                 // input for showPrice  box  and initially  Value  is empty  string
    const [dateTimeInput, setDateTimeInput] = useState("");         // input  for  the select date and time box 
    const [dateTimeSelection, setDateTimeSelection] = useState({}); 
    /*     

    It holds an object of   key value pairs, where:-->
    Each key is a date (string like "2025-07-27")
    Each value is an array of times (strings like ["15:00", "18:00"])


    example:-->
    {
      "2025-07-27": ["15:00", "18:00"],
      "2025-07-30": ["10:30"]
    }

    */

    
    const [addingShow, setAddingShow] = useState(false);            // loading state for making the addshow  button




    //remember this url is for getting all the shows from tmdb database by admin   we  did in showcontroller.js
     const fetchNowPlayingMovies = async () => {
        try {
            const { data } = await axios.get('/api/show/now-playing', {
                headers: { Authorization: `Bearer ${await getToken()}` }})
                if(data.success){
                    setNowPlayingMovies(data.movies)
                }
        } catch (error) {
            console.error('Error fetching movies:', error)
        }
    };
    



useEffect(() => {
  fetchNowPlayingMovies();
}, []);






// Add selected date & time into dateTimeSelection state
    const handleDateTimeAdd = () => {
        if (!dateTimeInput) return;    //➡️ If dateTimeInput is empty (i.e., user hasn't selected anything), then stop right here and exit the function.

        const [date, time] = dateTimeInput.split("T");            //   "2025-07-27T15:30"     .split("T") breaks this into:   date = "2025-07-27"    time = "15:30"
        if (!date || !time) return;                               //➡️ Just to be safe — if the split didn’t work (for some reason) and either date or time is missing, exit the function.

        setDateTimeSelection((prev) => {                       //explaine in docs
            const times = prev[date] || [];
            if (!times.includes(time)) {
                return { 
                    ...prev,
                    [date]: [...times, time] };   // add new time to existing array
            }
            return prev;
        });
    };






// Remove a time slot from a selected date
    const handleRemoveTime = (date, time) => {
        setDateTimeSelection((prev) => {
            const filteredTimes = prev[date].filter((t) => t !== time);   

            /*
            This removes the selected time from the list of times under the given date.

            we are making the filter like this as:-    .filter((t) => t !== time)
            
              ➤ Goes through each t (time) in the array
              ➤ Keeps only the times that are NOT equal to time
              ➤ It creates a new array with the remaining times.

            filter creates a new array with all other times except the one to remove.
            */

            if (filteredTimes.length === 0) {
                //If that was the only time for that date, then the date has no times left.    So we need to remove the whole date from the object.
                const { [date]: _, ...rest } = prev;
                return rest;   

                /*

                This is object destructuring.  

                It removes the date key from the object. 
                rest now has everything except that date.  


                better understand
                Extract the key "2025-07-28" (using [date]) from prev
                Give its value to _ (we're not going to use it, _ is just a throwaway variable)
                Put everything else (all other keys) into a new object called rest

                */
            }


            //else part
            return {
                ...prev,
                [date]: filteredTimes,
            };
        });
    };









    //Submit form to backend

    
    const handleSubmit = async ()=>{
        try {
            setAddingShow(true)      //disable button  so taht as long as process of adding goes on not be able to press  

            if(!selectedMovie || Object.keys(dateTimeSelection).length === 0 || !showPrice){   //if any of these data   is miss
                return toast('Missing required fields');
            }

            const showsInput = Object.entries(dateTimeSelection).map(([date, time])=> ({date, time}));

            const payload = {
                movieId: selectedMovie,
                showsInput,
                showPrice: Number(showPrice)
            }

            const { data } = await axios.post('/api/show/add', payload, {headers: { Authorization: `Bearer ${await getToken()}` }})

            if(data.success){
                toast.success(data.message)
                setSelectedMovie(null)
                setDateTimeSelection({})
                setShowPrice("")
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.error("Submission error:", error);
            toast.error('An error occurred. Please try again.')
        }
        setAddingShow(false)           //enable button
    }











    return nowPlayingMovies.length > 0 ? (
    <>
      {/* Page Title */}
      <Title text1="Add" text2="Shows" />





      {/* Movies Grid */}
      <p className="mt-10 text-lg font-medium">Now Playing Movies</p>

      
      <div className="overflow-x-auto pb-4">       {/* if the cards container goes out of screen  then scroll bar  */}
        <div className="group flex flex-wrap gap-4 mt-4 w-max">    {/* inner conatiner where we will have movie crds */}
            {nowPlayingMovies.map((movie) =>(

                <div 
                key={movie.id}
                className="relative max-w-40 cursor-pointer group-hover:not-hover:opacity-40     hover:-translate-y-1 transition duration-300"                               // hrere underetand menaong of group-hover:not-hover  in docs
                onClick={()=> setSelectedMovie(movie.id)}
                >


                    {/* Movie Poster  and   rating  and votescount*/}
                    <div className="relative rounded-lg overflow-hidden">

                        <img 
                        src={image_base_url + movie.poster_path}
                        alt="" 
                        className="w-full object-cover brightness-90" 
                        />

                        <div className="text-sm flex items-center justify-between p-2 bg-black/70 w-full absolute bottom-0 left-0">    {/*  see we use absolute  bottom-0 left-0    thats why the start icon and vote average are on the image of card  on bottom right */}
                            <p className="flex items-center gap-1 text-gray-400">
                                <StarIcon className="w-4 h-4 text-primary fill-primary" />
                                {movie.vote_average.toFixed(1)}
                            </p>
                            <p className="text-gray-300">{kConverter(movie.vote_count)} Votes</p>     {/* k converter converts like exmaple:-->  15000 to 15k */}
                        </div>

                    </div>



                    {/* Show check mark if selected */}
                    {selectedMovie === movie.id && (
                        <div className="absolute top-2 right-2 flex items-center justify-center bg-primary h-6 w-6 rounded">   {/* here it is absolute to teh movie poster so on right -top u see tick mark */}
                            <CheckIcon className="w-4 h-4 text-white" strokeWidth={2.5} />
                        </div>
                    )}




                    {/* the name of movie and release date  */}
                    <p className="font-medium truncate">{movie.title}</p>
                    <p className="text-gray-400 text-sm">{movie.release_date}</p>


                </div>
            ))}
        </div>
      </div>





      {/* Show Price Input */}
      <div className="mt-8">

        <label className="block text-sm font-medium mb-2">Show Price</label>
        <div className="inline-flex items-center gap-2 border border-gray-600 px-3 py-2 rounded-md">    {/* why inline -flex   : ---- --->    👀 Visual Example: If you used flex, this wrapper would take the full width of the container.    If you use inline-flex, it will only be as wide as its content (like inline elements)  so currency  and  input will benot full width but take as much width needed */}    {/* here inline flex is like flex row only but takes only needed width*/ }
            <p className="text-gray-400 text-sm">{currency}</p>
            <input              //meaning explained in docs
                min={0} 
                type="number" 
                value={showPrice}
                onChange={(e) => setShowPrice(e.target.value)}
                placeholder="Enter show price" 
                className="outline-none" 
            />
        </div>

      </div>





      {/* Date & Time Picker */}
      <div className="mt-6">
        <label className="block text-sm font-medium mb-2">Select Date and Time</label>

        <div className="inline-flex gap-5 border border-gray-600 p-1 pl-3 rounded-lg">
            <input 
                type="datetime-local" 
                value={dateTimeInput}
                onChange={(e) => setDateTimeInput(e.target.value)}
                className="outline-none rounded-md" 
            />

            <button 
                onClick={handleDateTimeAdd}
                className="bg-primary/80 text-white px-3 py-2 text-sm rounded-lg hover:bg-primary cursor-pointer" 
            >
            Add Time
            </button>

        </div>

      </div>




      {/* Show selected Date & Times */}
      {Object.keys(dateTimeSelection).length > 0 && (
        <div className="mt-6">

            <h2 className=" mb-2">Selected Date-Time</h2>
            <ul className="space-y-3">   {/*  ul is an unordered list   adn   space-y-3   means  "Add vertical spacing (y-axis) of size 3 between direct child elements." */}   {/*  and inside teh unordered list we have li tags to list items   in that we will use       selected date  and  tmme   and removal option        for  each  li tag  */}

                {Object.entries(dateTimeSelection).map(([date, times]) => (
                    <li key={date}>


                        <div className="font-medium">{date}</div>
                        <div className="flex flex-wrap gap-2 mt-1 text-sm">
                            {times.map((time) => (
                                <div   key={time}   className="border border-primary px-2 py-1 flex items-center rounded" >

                                <span>{time}</span>
                                
                                <DeleteIcon 
                                onClick={() => handleRemoveTime(date, time)}
                                width={15}
                                className="ml-2 text-red-500 hover:text-red-700 cursor-pointer" />

                                </div>
                            ))}
                        </div>


                    </li>
                ))}
            </ul>

        </div>
      )}




       <button onClick={handleSubmit} disabled={addingShow} className="bg-primary text-white px-8 py-2 mt-6 rounded hover:bg-primary/90 transition-all cursor-pointer" >
            Add Show
        </button>

    </>
  ) : <Loading />   //loading happens when no movies are present  nowPlayingMovies.length==0
}

export default AddShows




   











/* undertand difference between block and inline elemnts 


🧱 block elements:
Take full width of the container
Start on a new line
Can have width/height, margin, padding

🔹 Examples: <div>, <p>, <h1>, <section>



🧵 inline elements:
Take only as much width as needed
Stay in the same line with other inline elements
Cannot set width/height (mostly ignored)

🔹 Examples: <span>, <a>, <strong>, <label> (default)

*/