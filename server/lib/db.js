import mongoose from "mongoose";

//Function to connect to MongoDB Database
export const connectDB = async () => {
    try {
        mongoose.connection.on('connected', ()=> console.log('Database Connected'))

        await mongoose.connect(`${process.env.MONGODB_URI}/chat-app`)
    } catch (error) {
        console.log(error);
    }
}