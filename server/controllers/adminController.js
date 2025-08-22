import Booking from "../models/Booking.js"
import Show from "../models/Show.js";
import User from "../models/User.js";


// API to check if user is admin  
/*

When the frontend calls:----
axios.get('/api/admin/is-admin', {
  headers: { Authorization: `Bearer ${await getToken()}` }
})

req includes everything about the request:
The method (GET)
The URL/path (/api/admin/is-admin)
The headers (like Authorization: Bearer <token>)

*/

export const isAdmin = async (req, res) =>{   
    res.json({success: true, isAdmin: true})
}



/* 

API to get dashboard data     and  req  link  is  this  :-    http://localhost:3000/api/admin/dashboard
this  function willl show  
It will show the admin a quick summary of the system — 
total paid bookings, total revenue, 
upcoming shows with movie details, and total registered users.

*/

export const getDashboardData = async (req, res) =>{
    try {
        const bookings = await Booking.find({isPaid: true});
        const activeShows = await Show.find({showDateTime: {$gte: new Date()}}).populate('movie');

        const totalUser = await User.countDocuments();    //User.countDocuments() is a Mongoose method that runs the MongoDB countDocuments query.     It returns  Count of  how many documents are in the users collection.

        const dashboardData = {
            totalBookings: bookings.length,
            totalRevenue: bookings.reduce((acc, booking)=> acc + booking.amount, 0),
            activeShows,
            totalUser
        }

        res.json({success: true, dashboardData})    //returning the dashboard data
    } 
    catch (error) 
    {
        console.error(error);
        res.json({success: false, message: error.message}) 
    }
}






/*

API to get all shows

It fetches all upcoming or ongoing shows
from the database, includes full movie details, and 
sorts them by date/time in ascending order.

*/

export const getAllShows = async (req, res) =>{
    try {
        const shows = await Show.find({showDateTime: { $gte: new Date() }}).populate('movie').sort({ showDateTime: 1 })
        res.json({success: true, shows})
    } catch (error) {
        console.error(error);
        res.json({success: false, message: error.message})
    }
}









// API to get all bookings
export const getAllBookings = async (req, res) =>{
    try {
        const bookings = await Booking.find({}).populate('user').populate({
            path: "show",
            populate: {path: "movie"}
        }).sort({ createdAt: -1 })
        res.json({success: true, bookings })
    } 
    catch (error) 
    {
        console.error(error);
        res.json({success: false, message: error.message})
    }
}


 

/*
admin routes will look like :----

Check if user is admin
GET http://localhost:3000/api/admin/is-admin


Get dashboard data
GET http://localhost:3000/api/admin/dashboard


Get all upcoming shows
GET http://localhost:3000/api/admin/all-shows


Get all bookings
GET http://localhost:3000/api/admin/all-bookings




*/