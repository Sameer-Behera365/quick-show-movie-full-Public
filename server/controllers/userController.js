/*

This  

Lets a user view their bookings
Lets them mark/unmark movies as favorites
Lets them see the list of their favorite movies

*/

import { clerkClient } from "@clerk/express";    //her u use it locall   to use  Clerk Client function  clerkClient.users.getUser( );        but   you can import it globally in a central file (like server.js )  no issue in that
import Booking from "../models/Booking.js";
import Movie from "../models/Movie.js";


/*

API Controller Function to Get User Bookings        Yes — your getUserBookings is basically a "booking history" API.

this function:-
It finds which user is logged in.
It looks up all the movies that user booked (with full details).
It sends back the list of bookings, showing the latest one first. 

*/


 
export const getUserBookings = async (req, res)=>{     //URL  WILL  LOOK  SOMETHING LIKE THIS  FOR REQ OF  THIS  FUNCTION :- e.g. https://yourapp.com/api/user/bookings)

    try {
        const user = req.auth().userId;

        const bookings = await Booking.find({user}).populate({
            path: "show",
            populate: {path: "movie"}
        }).sort({createdAt: -1 })

        res.json({success: true, bookings})
    }
    
    
    catch (error) 
    {
        console.error(error.message);
        res.json({ success: false, message: error.message });
    }
}





/*

API Controller Function to update Favorite Movie in Clerk User Metadata
e.g. https://yourapp.com/api/user/update-favorite

we will pass something like this as req  as its a  POST
{
  movieId: "12345",
  title: "Inception",
  year: 2010,
  .....MORE FIELDS IT CAN GIVE TOO AS PER CLIENT
}

*/



export const updateFavorite = async (req, res)=>{   
    try {
        const { movieId } = req.body;
        const userId = req.auth().userId;

        const user = await clerkClient.users.getUser(userId)

        if(!user.privateMetadata.favorites){
            user.privateMetadata.favorites = []
        }

        if(!user.privateMetadata.favorites.includes(movieId)){
            user.privateMetadata.favorites.push(movieId)
        }else{
            user.privateMetadata.favorites = user.privateMetadata.favorites.filter(item => item !== movieId)
        }

        //UPDATE
        await clerkClient.users.updateUserMetadata(userId, {privateMetadata: user.privateMetadata})

        res.json({success: true, message: "Favorite movies updated" })
    } catch (error) {
        console.error(error.message);
        res.json({ success: false, message: error.message });
    }
}






//API TO GET the favourite movies of the particular user
export const getFavorites = async (req, res) =>{
    try {
        const user = await clerkClient.users.getUser(req.auth().userId)
        const favorites = user.privateMetadata.favorites;   //IT LIKE  A  ARRY IS RETURNED

        // Getting movies from database
        const movies = await Movie.find({_id: {$in: favorites}})

        res.json({success: true, movies})
    } 
    
    catch (error)
    {
        console.error(error.message);
        res.json({ success: false, message: error.message });
    }
} 