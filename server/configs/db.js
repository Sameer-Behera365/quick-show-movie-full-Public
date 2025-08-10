import mongoose from 'mongoose'; // Import mongoose library for MongoDB

const connectDB = async () => { // Async function to connect to DB   connectDB is just the name of our function.       async means the function will do something that takes time (like calling a database) and we can use await inside it.
    try {
        mongoose.connection.on('connected', () => console.log('Database connected')); // when DB is connected  we will display a  message  its like  a  event listener
        await mongoose.connect(`${process.env.MONGODB_URI}/quickshow`); // Connect to MongoDB using URL from .env + db name       and     await means “pause here until the database actually connects.”


    } catch (error) {
        console.log(error.message); // Log error if connection fails
    }
}

export default connectDB; // Export function so it can be used in other files













/*

mongoose.connection.on('connected', () => console.log('Database connected'));            Think of Mongoose like a phone operator calling MongoDB.

mongoose.connection = the phone line between your app and MongoDB.


.on(...)
This means: “Listen for something to happen on this connection.”
It’s like saying, “When this wire sends a certain signal, run my code.”




'connected'  measn what here ---->     This is the name of the signal/event we’re listening for.

Mongoose sends out different events depending on what happens:
'connected' → It has successfully connected to the database.
'error' → Something went wrong.
'disconnected' → The connection was lost.
Here, 'connected' just means “Database connection successful”.




The code inside () => console.log('Database connected') = “Say this when the call is picked up” (in our case, print Database connected on the screen).





*/






/*

💡 In plain English:
This file’s job is to connect your backend server to your MongoDB database so your app can store and read data.
It:

Imports Mongoose
Listens for a “connected” event
Connects to MongoDB using a secret link from .env
Shows a message if successful
Shows an error if it fails


*/