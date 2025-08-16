import mongoose from "mongoose";

const showSchema = new mongoose.Schema(
    {
        movie: {type: String, required: true, ref: 'Movie'},
        showDateTime: { type: Date, required: true },
        showPrice: { type: Number, required: true },
        occupiedSeats: { type: Object, default:{} } 
    }, { minimize: false}
)

const Show = mongoose.model("Show", showSchema);    //see showchema is like  a recipe  and    const Show = mongoose.model("Show", showSchema);   is like  a chef  which   create a Model called Show using this blueprint showSchema

 
export default Show;



 





/*

use of {minimize:false}
If an object field is empty, Mongoose will not save that field in the database at all.

Example:
const show = new Show({
  movie: "Avengers",
  showDateTime: new Date(),
  showPrice: 200,
  occupiedSeats: {}
});
await show.save();


If we don’t use { minimize: false }, MongoDB will store:
{
  "movie": "Avengers",
  "showDateTime": "2025-08-13T16:00:00.000Z",
  "showPrice": 200
}
Notice: occupiedSeats is gone because it’s empty.





With { minimize: false }, MongoDB will store:
{
  "movie": "Avengers",
  "showDateTime": "2025-08-13T16:00:00.000Z",
  "showPrice": 200,
  "occupiedSeats": {}
}












occupiedSeats: { type: Object, default: {} }

we didnt add required: true  because:-->
When you create a new document, you must provide a value for this field.
But here, we don’t want to force you to send occupiedSeats every time.

Instead:
If you don’t send it → it will automatically become {} (empty object) because of default: {}.
This makes life easier when creating a new show — you only need to send movie, showDateTime, and showPrice.


*/