/*
You made auth.js because it’s a middleware that handles authentication/authorization before certain routes run.


Typical reasons in your kind of project:--->
To protect admin-only APIs (e.g., adding shows should only be done by admins, not random users).
To verify a token (like JWT) sent from the frontend and make sure the request is from a logged-in and authorized user.
To stop the request early with an error if the user isn’t allowed.


*/







import { clerkClient } from "@clerk/express";

export const protectAdmin = async (req, res, next)=>{

    try
    {
        const { userId } = req.auth();

        const user = await clerkClient.users.getUser(userId)

        if(user.privateMetadata.role !== 'admin'){
            return res.json({success: false, message: "not authorized"})
        }

        next();
    } 
    
    
    catch (error) 
    {
        return res.json({ success: false, message: "not authorized" });
    }
}










/*

1. Importing Clerk

import { clerkClient } from "@clerk/express";           clerkClient is the SDK that lets you interact with Clerk's user management API from the server side (fetch users, check metadata, etc.).







2. Defining protectAdmin Middleware --->    export const protectAdmin = async (req, res, next) => {

This function is exported so it can be used in your route definitions.
It takes the standard Express middleware parameters:
req → request object
res → response object
next → function to move to the next middleware if authorized.







3. Extracting the Logged-in User ID

const { userId } = req.auth();  
object destructuring happening here:- --->   req.auth() returns an object from Clerk that looks something like:
{
  userId: "user_12345",
  sessionId: "sess_67890",
  getToken: [Function: getToken],
   maybe some more fields...
}


req.auth() is provided by Clerk’s middleware — it contains authentication data for the currently logged-in user.
userId is the unique ID of that logged-in user.











4. Fetching User Details  --->   const user = await clerkClient.users.getUser(userId);

Uses Clerk’s API to get full details about the particular  user  from  all the users   from the server side  and  here  userId  comes from res.auth()
user will include profile data, email, and metadata (like privateMetadata).









5. Checking the User’s Role

if (user.privateMetadata.role !== 'admin') {
    return res.json({ success: false, message: "not authorized" });
}
privateMetadata is where you can store custom secure fields for each user (like a role).
If the role is not "admin", the request is stopped and a "not authorized" JSON response is sent.







6. Calling next() if Authorized

next();   --->   If the user is an admin, next() lets the request proceed to the next route handler 


example:-    adminRouter.get('/dashboard', protectAdmin, getDashboardData);

Here’s the middleware chain for this route:
protectAdmin → checks if the user is admin
If OK → calls next()
If not OK → sends JSON {success: false, message: "not authorized"} and stops.
getDashboardData → it’s the final route handler.

It runs only if protectAdmin calls next().
Fetches dashboard info from DB and sends it to the client.








7. Error Handling

catch (error) {
    return res.json({ success: false, message: "not authorized" });
}
If something goes wrong (e.g., invalid userId, Clerk API issue), it sends back "not authorized".




*/