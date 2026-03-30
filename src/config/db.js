import mongoose from "mongoose";

const DATABASE_URL = "mongodb://localhost:27017/Crowdfunder"

export const connectDB = async () => {
    try {

        const conn  = await mongoose.connect(DATABASE_URL);
        console.log(`DATABASE connected successfully: ${conn.connection.host}`)

    }catch(err) {
        console.error("DATABASE not connect", err)
    }
}