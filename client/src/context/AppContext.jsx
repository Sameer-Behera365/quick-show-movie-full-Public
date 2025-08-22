/*

It manages global state for your React app.
It uses React Context to share data (like shows, favorite movies, and user info) across all components.
It fetches data from the backend (shows, favorite movies, admin check) and stores it in state.
The data is then made available to any child component in the app.


*/


import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL   //So, in this case, the default value of axios.defaults.baseURL will be http://localhost:3000.   so  anytime u do ex:-    a  get  or  a  post request  axios.get('/movies')      it will add the base url and  Axios will actually make a request to:  http://localhost:3000/movies

export const AppContext = createContext()








export const AppProvider = ({ children })=>{

    const [isAdmin, setIsAdmin] = useState(false)
    const [shows, setShows] = useState([])
    const [favoriteMovies, setFavoriteMovies] = useState([])

    const image_base_url = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;


    const {user} = useUser()
    const {getToken} = useAuth()
    const location = useLocation()
    const navigate = useNavigate()   //for  using navigate() ou can name it anything



 
 


    
  //see if user  is  admin is true
    const fetchIsAdmin = async ()=>{
        try {
            const {data} = await axios.get('/api/admin/is-admin', {headers: {Authorization: `Bearer ${await getToken()}`}})
            setIsAdmin(data.isAdmin)    //so   setIsAdmin will change the use state to true  if isAdmin:true as  :-    { "success": true, "isAdmin": true }    else  it will remain false


            if(!data.isAdmin && location.pathname.startsWith('/admin')){
                navigate('/')                                    
                toast.error('You are not authorized to access admin dashboard')
            }
        } catch (error) {
            console.error(error)
        }
    }



 
    
//this is for user  get all   unique shows  names   in  an array form    running present and future we did thsi route           showRouter.get("/all", getShows)            in  showRouter.js

    const fetchShows = async ()=>{
        try {
            const { data } = await axios.get('/api/show/all')   //reember  that route/all will give use  =====>       {   "success": true  , "shows":[   { },{ },{ },....{  }   all unique ones   ]     }
            if(data.success){
                setShows(data.shows)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.error(error)
        }
    }






//fetch fav movies of a paeticular user
    const fetchFavoriteMovies = async ()=>{
        try {
            const { data } = await axios.get('/api/user/favorites', {headers: {Authorization: `Bearer ${await getToken()}`}}) 

            if(data.success){
                setFavoriteMovies(data.movies)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.error(error)
        }
    }



    // As soon as you open any page with this code, it fetches the shows. It only happens once per page load. ✅
    // If you refresh the page, the component mounts again → so fetchShows() runs again. But while staying on the page, it won’t run multiple times.
    useEffect(()=>{
        fetchShows()
    },[])





    /*
    
    This runs whenever user changes.
    
    So when a person logs in or logs out, this effect triggers.
    If there is a user, then:
    fetchIsAdmin() checks if that user has admin privileges.
    fetchFavoriteMovies() loads that user’s favorite movies.
    
    ✅ In short: “When user logs in/out, update admin status and favorites.”
 
    */

    useEffect(()=>{
        if(user){
            fetchIsAdmin()
            fetchFavoriteMovies()
        }
    },[user])


 


    //lets pass all these state variables  and  functions   throught this value object so  that we can access it  from any  other components 
    //as i put only these variables  and  functions  so  Only those variables and functions you put inside value are shared with the children and nothing  else
    const value = {
        axios,
        fetchIsAdmin,
        user, getToken, navigate, isAdmin, shows, 
        favoriteMovies, fetchFavoriteMovies,image_base_url
    }





    

    return (
        <AppContext.Provider value={value}>
            { children }
        </AppContext.Provider>
    )
}



//to access this context  in other files  we will use export
export const useAppContext = ()=> useContext(AppContext)





