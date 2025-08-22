import mongoose from "mongoose";
 
const bookingSchema = new mongoose.Schema({
    user: {type: String, required: true, ref: 'User'},
    show: {type: String, required: true, ref: 'Show'},
    amount: {type: Number, required: true},
    bookedSeats: {type: Array, required: true},
    isPaid: {type: Boolean,  default:false},
    paymentLink: {type: String},
},{timestamps: true })
 
const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;

 

/*
The models/booking.js file is for storing 
booking records — basically, when a user 
books seats for a specific show.So basically  It keeps track of Bookings table records which user reserved which seats for which show.
  

Which user booked (user)
Which show it was for (show)
The amount paid (amount)
The seats booked (bookedSeats)
Whether payment is completed (isPaid)
A payment confirmation/link (paymentLink)
Automatic booking creation & update times (timestamps)  
 -->createdAt → date & time when the booking was first created    
 --> updatedAt → date & time when the booking document was last modified


 example:-
 createdAt = first time the booking was made
 updatedAt = last time any field in that booking document was changed (like payment status, seats, amount, etc.)


*/




/*   example  of  this  schema:-



{
  "_id": "66c1b3a5c94df4a1a2a56789",                //thius is provided by kmongo db when u put a dovument in booking database     or  whatev3r documnt u put in whatever datbase like movie...etc   always  in mongodb  u will have  that _id   for each documnet
  "user": "66b8f123abc9d45f89e01234",       
  "show": "66b9b2f5c94df4a1a2a1234",           
  "amount": 750,                            
  "bookedSeats": ["A1", "A2", "B5"],        
  "isPaid": false,                            
  "paymentLink": "https://checkout.stripe.com/pay/cs_test_123456",
  "createdAt": "2025-08-15T10:25:43.123Z",
  "updatedAt": "2025-08-15T10:25:43.123Z",
  "__v": 0
}


*/