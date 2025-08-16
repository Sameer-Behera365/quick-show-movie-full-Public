/*
We make movie.js to keep all movie-related 
API code or logic in one place 
instead of scattering it 
across files — it makes the project organized and easier to maintain.


Your movie.js file defines a MongoDB blueprint for how movie documents 
should look, and creates a Mongoose model so you can easily 
create, read, update, and delete movies in your database.
*/
  



import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(                //here u can name whatever name u want  here   like instead of title  u can give munna
    {
        _id: {type: String, required: true},
        title: {type: String, required: true},
        overview: {type: String, required: true},
        poster_path: {type: String, required: true},
        backdrop_path: {type: String, required: true},
        release_date: {type: String, required: true},
        original_language: {type: String},
        tagline: {type: String},
        genres: {type: Array, required: true},
        casts: {type: Array, required: true},
        vote_average: {type: Number, required: true},
        runtime: {type: Number, required: true},
    }, {timestamps: true}
)

 
const Movie = mongoose.model('Movie', movieSchema)    //name of our schema  is Movie
export default Movie;





/*

{ timestamps: true }
means Mongoose will automatically add two extra fields to every document:
createdAt → when the document was first created.
updatedAt → when the document was last modified.

Why it’s useful:

You don’t have to manually track when a movie was added or changed.
Makes it easy to sort movies by date, show “last updated” times, or filter by date ranges.

No, you don’t need to add timestamps  compulsarily: its  optional.   
Without it, you’d need to manually add and update date fields yourself.
*/




/*
{ timestamps: true }
that part is an object you’re passing as the second argument to new mongoose.Schema().

The first argument ({ _id: ..., title: ..., ... }) defines your document’s fields.
The second argument ({ timestamps: true }) is an options object telling Mongoose to enable certain features — in this case, automatic createdAt and updatedAt fields.

So, it’s basically:
new mongoose.Schema(fieldsObject, optionsObject)   like thsi u will be passing



*/


