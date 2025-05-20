import mongoose from "mongoose";

const ConnectToDb=async()=>{
    const db=await mongoose.connect(process.env.MONGO_URI);
    try {
        if(db)
            console.log("mongodb connected");
    } catch (error) {
        console.log(error);
    }
};
export default ConnectToDb;