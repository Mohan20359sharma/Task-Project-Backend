const userModel=require("../models/users.model");
const getAllUsers=async(req,res)=>{
    try{
        const users=await userModel.find();
        res.status(200).json({
            success:true,
            users
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

module.exports={ getAllUsers }