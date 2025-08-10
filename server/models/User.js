import mongoose from "mongoose";    // Import Mongoose so we can define schemas and work with MongoDB   and   Schema = a blueprint for how data should look in MongoDB

const userSchema = new mongoose.Schema({          //making the schema
    _id: { type: String, required: true },        // This is the unique ID for the user (String type, must be given)
    name: { type: String, required: true },       // The user's name (String, must be given)
    email: { type: String, required: true },      // The user's email (String, must be given)
    image: { type: String, required: true }       // A link or path to the user's image (String, must be given)
});


const User= mongoose.model('User', userSchema);   // This creates a model named "User" based on the schema. "User" is what you'll use in your code to create, read, update, delete user data.

export default User;    // Makes the model available to be imported in other files








/* use of thsi file  is  to  get the schema  to   other   files  */

/* 
 


these are some fields (or “properties”) of your MongoDB User document.

type: String → This field only accepts text values. If you try to save a number or object, Mongoose will complain.

required: true → You must provide this field when creating a user. If it’s missing, MongoDB rejects the save.

trim: true → Removes spaces at the start and end automatically (" John " becomes "John").

lowercase: true → Converts all letters to lowercase before saving (useful for making emails consistent).

unique: true → Creates a special index so no two users can have the same value here (prevents duplicates).

Custom _id → Normally MongoDB generates an _id automatically, but if you create your own, you must ensure it’s different for every user or it will cause an error.

*/