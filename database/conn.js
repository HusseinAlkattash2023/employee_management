import mongoose from "mongoose";

const connectMongo = async()=>{
    try {
        const {connections}= await mongoose.connect(process.env.MONGO_URI);
        if(connections.readyState === 1 ) console.log("Database Connection")
    } catch (error) {
        return Promise.reject(errors)
    }
}

export default connectMongo;