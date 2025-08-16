/*
We create a routes folder so our project stays organized 
its where we keep all the URL “paths” that connect frontend requests to backend logic.

Think of it like:
Frontend → “I want /movies/now-playing”
Routes → “Okay, if someone asks for /movies/now-playing, I’ll run getNowPlayingMovies from the controller.”

Benefits of having a routes folder:--->
Clean code – URLs are managed in one place instead of scattered all over server.js.
Easier to update – if a path changes, you only edit it here.
Keeps server.js small – server.js just loads routes instead of having all the logic inside it

*/




 




import { addShow, getNowPlayingMovies, getShow, getShows } from "../controllers/showController.js";
import express from "express";
import { protectAdmin } from "../middleware/auth.js";


const showRouter = express.Router();



showRouter.get('/now-playing', protectAdmin  ,getNowPlayingMovies)      //api  end  point for getting all teh current playing movies  by admin ony
showRouter.post('/add', protectAdmin , addShow)                         //api end point for adding shows  by  admin  only
showRouter.get("/all", getShows)
showRouter.get("/:movieId", getShow)

 

export default showRouter;   






/*

1️⃣ What import { getNowPlayingMovies } does
It does not create an object with { getNowPlayingMovies: ... }.
It pulls a single named export called getNowPlayingMovies from the showController.js file.
That value is whatever was exported from showController.js — in this case, a function.


2️⃣ What happens in  showRouter.get('/now-playing', getNowPlayingMovies);
You’re passing that function to Express as the handler for the /now-playing route.
When a request comes in, Express will call getNowPlayingMovies(req, res).






protectAdmin is middleware — a special function that runs before your main function like  :-- getNowPlayingMovies , ......etc.

What it does (in plain words)
It’s like a security guard for your route.
If the user is not an admin (or not logged in), it blocks access and sends back an error.
If the user is allowed, it lets them pass through to the next function.
*/


