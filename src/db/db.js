const mongoose=require("mongoose")

const connectDB=()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connected DB");
    }).catch((err)=>{
        console.error("Error connecting to DB",err);
    })
    // console.log("Connected DB");
    // console.log("Mongo URI: ",process.env.MONGO_URI);
}
module.exports=connectDB;