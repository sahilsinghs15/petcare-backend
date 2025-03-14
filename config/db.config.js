import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();

mongoose.set('strictQuery' , false);
const connectionToDb = async()=>{

    try{
        const {connection} = await mongoose.connect(process.env.MONGO_URI || "mongodb+srv://sahilsinghmongotest:sahilsingh72@cluster0.xw4zw.mongodb.net/niPet");
    
        if(connection){
            console.log("Database successfully connected on the" , connection.host);
        }
    }catch(e){
        console.log(e);
        process.exit(1);
    }
    
}

export default connectionToDb;