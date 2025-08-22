//thsi si stripe webhooks fiel whivh will verify the paymnet



import stripe from "stripe";
import Booking from '../models/Booking.js'
import { inngest } from "../inngest/index.js";

export const stripeWebhooks = async (request, response)=>{
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
    const sig = request.headers["stripe-signature"];

    let event;     //just its a name of  a variable 

    /*
✅ When the try part succeeds
Signature is valid ✔
Payload is valid JSON ✔
Then event becomes the trusted Stripe event object.
Code continues after the try/catch (not inside catch).

❌ When the catch part runs
The catch block runs if something goes wrong, for example:
The sig (Stripe-Signature header) is missing or incorrect.
The webhook secret doesn’t match.
The request body is tampered with.
Payload isn’t valid JSON.
    */
    
    try {
        event = stripeInstance.webhooks.constructEvent(request.body, sig, process.env.STRIPE_WEBHOOK_SECRET)   //payload  , signature , web hook secret key
    } catch (error) {
        return response.status(400).send(`Webhook Error: ${error.message}`);
    }




    /*
    
    now in this the catch block will run whenever:-

    The catch (err) runs if anything inside try throws an error, for example:
    Stripe API call fails (checkout.sessions.list error).
    sessionList.data[0] is undefined.
    Booking.findByIdAndUpdate fails (e.g., booking not found).
    or Some unexpected bug in the code.
    
    */

    try {
        switch (event.type) {
            case "payment_intent.succeeded": {                        //
                const paymentIntent = event.data.object;
                const sessionList = await stripeInstance.checkout.sessions.list({
                    payment_intent: paymentIntent.id
                })

                const session = sessionList.data[0];
                const { bookingId } = session.metadata;

                await Booking.findByIdAndUpdate(bookingId, {
                    isPaid: true,
                    paymentLink: ""
                })
                break;
            }
        
            default:
                console.log('Unhandled event type:', event.type)
        }
        response.json({received: true})
    } catch (err) {
        console.error("Webhook processing error:", err);
        response.status(500).send("Internal Server Error");
    }
}