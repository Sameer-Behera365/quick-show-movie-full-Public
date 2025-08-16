import { inngest } from "../inngest/index.js";
import Booking from "../models/Booking.js";
import Show from "../models/Show.js"
// import stripe from 'stripe'


// Function to check availability of selected seats for a movie
const checkSeatsAvailability = async (showId, selectedSeats)=>{
    try {
        const showData = await Show.findById(showId)     
        if(!showData) return false;

        const occupiedSeats = showData.occupiedSeats;

        const isAnySeatTaken = selectedSeats.some(seat => occupiedSeats[seat]);  
        //  .some() → Checks if at least one item in the array meets the condition and returns true if it does, otherwise false.
        // occupiedSeats is an object like:    { "A1": true, "A2": true, "B5": true }    If in occupiedSeats and has true, it means that seat is already taken.
        //  if  any one seat is occupied then it will do isAnySeatTaken = true;

        return !isAnySeatTaken;
    } 

    catch (error) 
    {
        console.log(error.message);
        return false;
    }
}



/*


createBooking handles seat availability check,
creates a booking record, marks seats as occupied, 
sets up Stripe payment, and returns the payment link.


 req.body  will look like this:-
{
  "showId": "66b9b2f5c94df4a1a2a1234",
  "selectedSeats": ["A1", "A2", "B5"]
}

*/

export const createBooking = async (req, res)=>{                        //here  urll  is   something  like this  POST http://localhost:3000/api/booking/create


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
            showData.occupiedSeats[seat] = userId;
        })

        showData.markModified('occupiedSeats');   
        await showData.save();



         /*


         // Stripe Gateway Initialize
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

         const session = await stripeInstance.checkout.sessions.create({
            success_url: `${origin}/loading/my-bookings`,
            cancel_url: `${origin}/my-bookings`,
            line_items: line_items,
            mode: 'payment',
            metadata: {
                bookingId: booking._id.toString()
            },
            expires_at: Math.floor(Date.now() / 1000) + 30 * 60, // Expires in 30 minutes
         })

         booking.paymentLink = session.url
         await booking.save()

         // Run Inngest Sheduler Function to check payment status after 10 minutes
         await inngest.send({
            name: "app/checkpayment",
            data: {
                bookingId: booking._id.toString()
            }
         })

         res.json({success: true, url: session.url})



         */




        res.json({success: true, message:'booked successfully'})
    } 
    
    catch (error)
    {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}







export const getOccupiedSeats = async (req, res)=>{
    try {

        //here req  url is like this:-    GET    http://localhost:3000/api/booking/seats/64f3a7f23b0b2d45a9e7d0a5

        const {showId} = req.params;
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

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}






