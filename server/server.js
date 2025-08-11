/*

Your server.js is the main entry point for your backend. It’s the file that:
Starts the backend server (with Express).
Connects to MongoDB (with your connectDB() function).
Sets up middleware so your backend can read JSON and allow frontend requests.
Defines API routes — for now, just / that says "Server is Live!".
Listens on a port so the frontend or tools can send requests to it.
Without server.js, your backend wouldn’t start — it’s like the ignition key for your whole app.

*/









import express from 'express'; // Express framework for creating the backend server    and   also it gives  u    gives you express.json()
import cors from 'cors';       // allow frontend and backend to talk to each other   gives you cors()
import 'dotenv/config';        // Loads environment variables from a .env file
import connectDB from './configs/db.js';
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"
import { clerkMiddleware } from '@clerk/express';









// Create an Express app instance
const app = express();
const port = 3000; // Port number where the server will run





await connectDB();
/*
await connectDB();     means you’re making sure the database connects before the rest of the server starts handling requests.

Why this is important:  Without it, your server might start before MongoDB is ready.
That can cause errors if a route tries to read/write from the DB while the connection isn’t open yet.

*/
 



/* -------- MIDDLEWARE --------   
What “middleware” means   ans:-  Middleware is code that sits in the middle between:  the request coming in from the client, and  the response going out from the server.    It’s like a checkpoint or filter that every request passes through before hitting your routes.
here some  middle wares are:-   express.json()    and    cors()     ...etc  

here    .use in Express means:  "Apply this middleware to every incoming request."



1️⃣ app.use(express.json())

Backend = person receiving letters.
Frontend sends letters in JSON format ({ "name": "John" }).
By default, backend can’t read them — req.body will be undefined.
express.json() = translator that opens JSON and puts it into req.body.


2️⃣ app.use(cors())

Backend on localhost:3000, frontend on localhost:5173.
Browsers block requests between different addresses (CORS policy).
cors() = “It’s okay, this other address is allowed to talk to me.”
*/

app.use(express.json());                   // Allows server to understand JSON data in requests (like POST body)
app.use(cors());                           // Enables Cross-Origin Resource Sharing (frontend <-> backend communication)
app.use(clerkMiddleware());                //clerk middleware  here it means   that   You’re telling Express: “Before any route runs, check the request with Clerk’s authentication middleware.”   ok look in cofiqure  in clerk we had web hooks so we could do manually web hooks end point or use ingest which make sit easir er for us   working with web hooks       and   in ingest  i used   sameer123







// -------- ROUTES --------   This is a simple GET API endpoint at the root URL ('/')    When someone visits http://localhost:3000/ in a browser, it sends back "Server is Live!"
app.get('/', (req, res) => res.send('Server is Live!'));
app.use('/api/inngest', serve({ client: inngest, functions }))      // defining an API enpoint at the    --> path /api/innhest









// -------- START SERVER --------   Starts the server and listens on the specified port whatever u mentioned it takes 2 parameters  the  port number  and call back function  The callback prints a message so we know the server started successfully
app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));






















//mongo   with  sonubehera   and    afetr padssword   -->  sameer   and   sameer123      and             sameernew  for ingest  and  clerk   and  vercel




/*
advantages of ingest  📦 Imagine You Run an Online Store    You use Clerk for authentication.

Clerk sends you “packages” (events) like:

📜 user.created
📜 user.updated
📜 user.deleted

Without Ingest
Clerk → Your server directly.
If your server is down, that package is gone.
If your code is slow, new events pile up.
If you make a bug and crash while processing… you lose that package.
No easy way to “replay” the event to try again.
It’s like a delivery guy knocking once, and if you’re not home, the package is gone forever. 🚪📦💨



With Ingest
Clerk → Ingest service → Your server.   The Ingest service acts like:

A warehouse 🏢 that always receives events, even if you’re offline.
A storage room where events are saved until you’re ready.
A retry system — it keeps trying until you successfully process it.
A logbook — you can see every event in history.
A traffic manager — it won’t overload your server.


*/










/*

import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"
import showRouter from './routes/showRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';
import adminRouter from './routes/adminRoutes.js';
import userRouter from './routes/userRoutes.js';
import { stripeWebhooks } from './controllers/stripeWebhooks.js';

const app = express();
const port = 3000;

await connectDB()

// Stripe Webhooks Route
app.use('/api/stripe', express.raw({type: 'application/json'}), stripeWebhooks)

// Middleware
app.use(express.json())
app.use(cors())
app.use(clerkMiddleware())


// API Routes
app.get('/', (req, res)=> res.send('Server is Live!'))
app.use('/api/inngest', serve({ client: inngest, functions }))
app.use('/api/show', showRouter)
app.use('/api/booking', bookingRouter)
app.use('/api/admin', adminRouter)
app.use('/api/user', userRouter)


app.listen(port, ()=> console.log(`Server listening at http://localhost:${port}`));




*/