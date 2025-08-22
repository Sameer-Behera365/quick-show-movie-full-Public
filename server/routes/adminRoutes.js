import express from "express";
import { protectAdmin } from "../middleware/auth.js";
import { getAllBookings, getAllShows, getDashboardData, isAdmin } from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.get('/is-admin', protectAdmin, isAdmin)
adminRouter.get('/dashboard', protectAdmin, getDashboardData)
adminRouter.get('/all-shows', protectAdmin, getAllShows)
adminRouter.get('/all-bookings', protectAdmin, getAllBookings)

export default adminRouter; 

 


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