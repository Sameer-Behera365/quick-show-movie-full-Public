import React, { useEffect, useState } from 'react'
import { dummyShowsData } from '../../assets/assets';
import Loading from '../../components/Loading';
import Title from '../../components/admin/Title';
import { dateFormat } from '../../lib/dateFormat';
import { useAppContext } from '../../context/AppContext';

const ListShows = () => {

    const currency = import.meta.env.VITE_CURRENCY

    const {axios, getToken} = useAppContext()

    const [shows, setShows] = useState([]);           //here shows  is  an array of objects  
    const [loading, setLoading] = useState(true);






// thsi one will give us all teh shows present in show database
   const getAllShows = async () =>{
        try {
            const { data } = await axios.get("/api/admin/all-shows", {
                headers: { Authorization: `Bearer ${await getToken()}` }
            });
            setShows(data.shows)
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    }




       useEffect(() => {
        getAllShows();
      }, []);















  return !loading ? (
    <>
      <Title text1="List" text2="Shows" />


      
      <div className="max-w-4xl mt-6 overflow-x-auto">   {/*  so her purpose of overflow-x-auto      :- if your table is too wide on small screens → you can scroll left-right instead of it breaking out. */}

         <table className="w-full border-collapse rounded-md overflow-hidden text-nowrap">
             <thead>   {/* table header  */}
                <tr className="bg-primary/20 text-left text-white">
                    <th className="p-2 font-medium pl-5">Movie Name</th>
                    <th className="p-2 font-medium">Show Time</th>
                    <th className="p-2 font-medium">Total seats Booked</th>
                    <th className="p-2 font-medium">Earnings</th>
                </tr>
            </thead>

            <tbody className="text-sm font-light"> {/* table body */}
                {shows.map((show, index) => (
                    <tr key={index} className="border-b border-primary/10 bg-primary/5 even:bg-primary/10">
                        <td className="p-2 min-w-45 pl-5">{show.movie.title}</td>
                        <td className="p-2">{dateFormat(show.showDateTime)}</td>
                        <td className="p-2">{Object.keys(show.occupiedSeats).length}</td>
                        <td className="p-2">{currency} {Object.keys(show.occupiedSeats).length * show.showPrice}</td>
                    </tr>
                ))}
            </tbody>
         </table>

      </div>
    </>
  ) : <Loading />
}

export default ListShows



/*  all the table tags which we used in our code

<table> → main table container.
<thead> → header section for column titles.
<tbody> → body section for data rows.
<tr> → table row.
<th> → header cell (in <thead>).
<td> → data cell (in <tbody>).



diff between      th  and  td  ?
th → table heading cell (column titles).     th is used with <thead>
td → table data cell (actual values).          td is used with <tbody>
*/


/*
see occupied seats is an array:   example:--->  occupiedSeats: { "A1": true, "A2": true }
For an object, you can’t use .length directly (only arrays have .length)   that why we sued Object.keys(...)
*/



/*
why we use try ...catch?

For your dummy data: No, try...catch is not needed.
For real API: Yes, you need it.

*/