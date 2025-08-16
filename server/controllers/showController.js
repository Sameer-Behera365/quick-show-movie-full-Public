/*
----------------------------------------------------------------------------------------------

In your project, showControllers.js is where you write the logic for handling requests about shows.

It Uses the Show model to create, read, update, or delete show data in MongoDB.
It Acts as a middleman between routes (/shows/...) and the database.
It Keeps your code organized by separating database logic from route definitions.
----------------------------------------------------------------------------------------------

what are axios?
Axios is a JavaScript library used to make HTTP requests (send/receive data) between your frontend and backend or to external APIs.

Purpose / meaning in simple terms:--->
It’s like a messenger that carries your request (GET, POST, PUT, DELETE) to a server.
Brings back the response data so your app can use it.
Works in both browser and Node.js.

Example:
import axios from "axios";
const res = await axios.get("/api/shows"); // asks server for shows
console.log(res.data); // shows the data received

----------------------------------------------------------------------------------------------

*/







import axios from "axios"
import Movie from "../models/Movie.js";
import Show from "../models/Show.js";
import { inngest } from "../inngest/index.js";




/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


getNowPlayingMovies →

Connects to TMDB (The Movie Database)
Gets a list of movies that are currently in theaters
Sends that list to the frontend
Handles any errors if something goes wrong.

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


When you use a .env file and a library like dotenv, your variables are loaded into process.env at runtime.

What is  process.env?
process → Built-in object in Node.js that has info about the running program.
process.env → Special object inside process that stores environment variables (key–value pairs loaded from your system or .env file).

So: process.env.TMDB_API_KEY     means:    “Go to Node’s process object → look inside its environment variables → give me the value for TMDB_API_KEY.”



--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


A Bearer token is just a special kind of access key used in APIs to prove you’re allowed to make the request.

In your code: headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` }

Authorization: → HTTP header name telling the server “here’s my access credentials.”
Bearer → a keyword meaning “this is a token.”
${process.env.TMDB_API_KEY} → your TMDB API key, stored safely in .env so it’s not hardcoded in code.



--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

this way of writing the code we got it from the now playing tmdb section code  website itself the structure how to write it

*/






 
// API to get now playing movies from TMDB API    ------>    just for loooking by admin  that   Gets a list of movies that are currently in theaters              then  he decides which one to aff    by  using addshow functionm
export const getNowPlayingMovies = async (req, res)=>{                                                //makes this function available to be imported in other files (like your routes).      //  here its async   means  it lets us use await for waiting until data comes back.  // req is what the user sends, res is what we send back.
    try {                                                                                             //try { ... } → you put risky code inside here. If anything goes wrong, it jumps to the catch block.
        const { data } = await axios.get('https://api.themoviedb.org/3/movie/now_playing', {          //  { data } means you’re taking only the data property from axios’s response object and storing it in a variable named data.        //axios.get(...) → Go to TMDB and ask for “now playing” movies.
            headers: {Authorization : `Bearer ${process.env.TMDB_API_KEY}`}                           //headers: { Authorization: ... } → TMDB needs your secret API key to know you’re allowed to get the data. We send it as a Bearer token from .env.
        })
        const movies = data.results;
        res.json({success: true, movies: movies})
    } catch (error) {
        console.error(error);
        res.json({success: false, message: error.message})
    }
}






// API to add a new show to the database            and  explanatiuon in docs
export const addShow = async (req, res) =>{
    try {
        const {movieId, showsInput, showPrice} = req.body    //the admin gives input

        let movie = await Movie.findById(movieId)
        if(!movie) {

            // Fetch movie details and credits from TMDB API    and  its in tmdbapi MOVIES /Details       and    tmdbapi  MOVIE/Credits
            const [movieDetailsResponse, movieCreditsResponse] = await Promise.all([

            //  First URL → movie details (title, release date, overview, etc.).
                axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
            headers: {Authorization : `Bearer ${process.env.TMDB_API_KEY}`} }),


            //Second URL → movie credits (cast, crew, etc.).
                axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
            headers: {Authorization : `Bearer ${process.env.TMDB_API_KEY}`} })

            ]);


            /*
             movieDetailsResponse is an Axios response object, which has properties like:    --->   data → the actual JSON returned from the TMDB API.     status → HTTP status code (e.g., 200).      headers → response headers.
             so here we just extract the data  from that object
            */
            const movieApiData = movieDetailsResponse.data;
            const movieCreditsData = movieCreditsResponse.data;


            //Here you are picking the specific fields from the API data and shaping them into an object that matches your MongoDB schema.
             const movieDetails = {
                _id: movieId,
                title: movieApiData.title,
                overview: movieApiData.overview,
                poster_path: movieApiData.poster_path,
                backdrop_path: movieApiData.backdrop_path,
                genres: movieApiData.genres,
                casts: movieCreditsData.cast,
                release_date: movieApiData.release_date,
                original_language: movieApiData.original_language,
                tagline: movieApiData.tagline || "",
                vote_average: movieApiData.vote_average,
                runtime: movieApiData.runtime,
             }


             // Add movie to the database
             movie = await Movie.create(movieDetails);
        }


        //we make an  object where  we  put a   particular show  all dates and  time  combinations
        const showsToCreate = [];
        showsInput.forEach(show => {
            const showDate = show.date;                   // e.g., "2025-08-20"
            show.time.forEach((time) => {                 // e.g., ["18:00", "21:00"]
            const dateTimeString = `${showDate}T${time}`; // e.g., "2025-08-20T18:00"
            
            showsToCreate.push({                      //.push means  means “insert this new object at the end of the showsToCreate array.”
            movie: movieId,                          
            showDateTime: new Date(dateTimeString),  // Date object
            showPrice,                               // ticket price   and  here That showPrice, without a : is not a typo — it’s JavaScript shorthand property syntax.      It’s the same as writing:   showPrice: showPrice
            occupiedSeats: {}                        // empty at start
            });

          });
        });




        //If there’s at least one show in that array (length > 0)
        // Show.insertMany(showsToCreate) will save all of them to the database in one go.
        if(showsToCreate.length > 0){
            await Show.insertMany(showsToCreate);     //all combinations of date and time of taht show will be stored
        }


        /* 

        //  Trigger Inngest event
         await inngest.send({
             name: "app/show.added",
             data: {movieTitle: movie.title}
         })


        */


        res.json({success: true, message: 'Show Added successfully.'})
    }
    
    catch (error)
    {
        console.error(error);
        res.json({success: false, message: error.message})
    }
}





/*

so in this  addShow  what we doing:-

in your addShow code:
If the movie already exists in MongoDB (Movie.findById(movieId) finds it) → it will not add it again. It just uses the existing movie document.

If the movie does not exist → it will:
Fetch its details & credits from TMDB API.
Create a new movieDetails object matching your Movie schema.
Save it to the database with Movie.create(movieDetails).
So the “add movie” step only happens when the movie isn’t already stored.

*/






// API to get all shows from the database       --->   this  one  users   can access  to see all  the  shows  from  Show  database ---> remember  show data base  is  date  and  time combinatios  of  all shows
export const getShows = async (req, res) =>{
    try {
        const shows = await Show.find({showDateTime: {$gte: new Date()}}).populate('movie').sort({ showDateTime: 1 });

        const uniqueShows = new Set(shows.map(show => show.movie))            // filter unique shows 

        res.json({success: true, shows: Array.from(uniqueShows)})
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}








// API to get a single show from the database
export const getShow = async (req, res) =>{
    try {
        const {movieId} = req.params;

 
        // this line means Find all Show documents where the movie field equals movieId and the showDateTime is greater than or equal to the current date  and  time.     so  basically  a combination  of  the dates at present and future    and times at present and future  of  a particular movie       by  not  in  the manner  by which  we get  all  the shows  by  the  getShows function   as  it iuses  populate thats why here  just movie    field   will be  like  "movie": "66xyz789"
        const shows = await Show.find({movie: movieId, showDateTime: { $gte: new Date() }})

        //store the movie details in movie  variable  by searching through movieId  in  Movie  Database 
        const movie = await Movie.findById(movieId);

        const dateTime = {};

        shows.forEach((show) => {
            const date = show.showDateTime.toISOString().split("T")[0];    //.toISOString() is a JavaScript Date method that converts a Date object into a standard string format   and  then we split  split("T") is a JavaScript string method that breaks a string into an array, using "T" as the separator       example:- // ["2025-08-20", "18:00:00.000Z"]       and  then we choose the string in 0th  index

            if(!dateTime[date]){    //its like a  hashmap
                dateTime[date] = []
            }
            dateTime[date].push({ time: show.showDateTime, showId: show._id })
        })

        res.json({success: true, movie, dateTime})
    } 




    /*
    
    success json response                     res.json({success: true, movie, dateTime})         will look like this:-       

    {


  "success": true,

  "movie": {
    "_id": "66bc97f0879c87a5b31b3f14",
    "title": "Inception",
    "overview": "A thief who steals corporate secrets through dreams...",
    "poster_path": "/xyz123.jpg",
    "backdrop_path": "/backdrop123.jpg",
    "genres": [
      { "id": 28, "name": "Action" },
      { "id": 878, "name": "Science Fiction" }
    ],
    "casts": [
      { "name": "Leonardo DiCaprio", "character": "Cobb" },
      { "name": "Joseph Gordon-Levitt", "character": "Arthur" }
    ],
    "release_date": "2010-07-16",
    "original_language": "en",
    "tagline": "Your mind is the scene of the crime.",
    "vote_average": 8.3,
    "runtime": 148
    },

  "dateTime": {
    "2025-08-20": [
      { "time": "2025-08-20T18:00:00.000Z", "showId": "66bc98b6879c87a5b31b3f16" },
      { "time": "2025-08-20T21:00:00.000Z", "showId": "66bc98b6879c87a5b31b3f17" }
    ],
    "2025-08-21": [
      { "time": "2025-08-21T18:00:00.000Z", "showId": "66bc98b6879c87a5b31b3f18" }
    ]
  }


}

    
    */
    
    
    catch (error) 
    {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

