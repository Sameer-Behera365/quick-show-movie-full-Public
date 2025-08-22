import { inngest } from "../inngest/index.js";
import Booking from "../models/Booking.js";
import Show from "../models/Show.js"
import stripe from 'stripe'


// Function to check availability of selected seats for a movie
const checkSeatsAvailability = async (showId, selectedSeats)=>{
    try {
        const showData = await Show.findById(showId)     
        if(!showData) return false;

        const occupiedSeats = showData.occupiedSeats;

        const isAnySeatTaken = selectedSeats.some(seat => occupiedSeats[seat]);  
        //  .some() → Checks if at least one item in the array meets the condition and returns true if it does, otherwise false.
        // occupiedSeats is an object like:    { "A1": true, "A2": true, "B5": true }    If in occupiedSeats and has true, it means that seat is already taken.
        //  if  any one seat is occupied then it will make  isAnySeatTaken = true;

        return !isAnySeatTaken;
    } 

    catch (error) 
    {
        console.log(error.message);
        return false;
    }
}


 




export const createBooking = async (req, res)=>{                   

    try {
        const {userId} = req.auth();   
        const {showId, selectedSeats} = req.body;
        const { origin } = req.headers;

        // Check if the seat is available for the selected show
        const isAvailable = await checkSeatsAvailability(showId, selectedSeats)

        
        if(!isAvailable){
            return res.json({success: false, message: "Selected Seats are not available."})
        }


        // Get the show details 
        const showData = await Show.findById(showId).populate('movie');

        // Create a new booking
        const booking = await Booking.create({
            user: userId,                         //value from userId (from req.auth()).
            show: showId,                         //value from showId (from req.body).
            amount: showData.showPrice * selectedSeats.length,
            bookedSeats: selectedSeats
        })

        //now  we need to reserve these seats  in show .js  for thsi movieid so we are doing this
        selectedSeats.map((seat)=>{    
            showData.occupiedSeats[seat] = userId;              //it will look like this  A1:33223443344    A2:847477447y47y47   here    meaning  is  seat no :  userid
        })

        showData.markModified('occupiedSeats');   
        await showData.save();

         
//============================================================================================ Stripe Gateway Initialize
         const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY)

         // Creating line items to for Stripe
         const line_items = [{
            price_data: {
                currency: 'usd',
                product_data:{
                    name: showData.movie.title
                },
                unit_amount: Math.floor(booking.amount) * 100
            },
            quantity: 1
         }]



//payment session
         const session = await stripeInstance.checkout.sessions.create({
            success_url: `${origin}/loading/my-bookings`,                   
            cancel_url: `${origin}/my-bookings`,                            
            line_items: line_items,
            mode: 'payment',
            metadata: {
                bookingId: booking._id.toString()
            },
            expires_at: Math.floor(Date.now() / 1000) + 30 * 60
         })





         booking.paymentLink = session.url
         await booking.save()                   //we will save the booking in mongodb




         res.json({success: true, url: session.url})
// end  of stripe things ============================================================================================================================================
    } 
    
    catch (error)
    {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}







export const getOccupiedSeats = async (req, res)=>{                 //here the url will look like this  :- http://localhost:5000/api/booking/seats/:showId
    try {
        const {showId} = req.params;    //we get showId= req.params.showId
        const showData = await Show.findById(showId)
        const occupiedSeats = Object.keys(showData.occupiedSeats)
        res.json({success: true, occupiedSeats})    
        /*
        
         occupiedSeats: {
         "A1": true,
         "A2": true,
         "B5": true
        }

        Object.keys(showData.occupiedSeats)   will give  ["A1", "A2", "B5"]
        */
    } 

    catch (error) 
    {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}






