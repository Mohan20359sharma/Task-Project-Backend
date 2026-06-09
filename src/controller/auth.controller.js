const userModel=require("../models/users.model");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");

async function register(req,res){
    const {fullName,username,email,password,role='user'}=req.body;
    const existingUser=await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })
    if(existingUser){
        return res.status(400).json({
            message:"Username or email already exists"
        })
    }

    const hash=await bcrypt.hash(password,10);
    const user=await userModel.create({
        fullName,
        username,
        email,
        password:hash,
        role
    })
    const token=jwt.sign({
        id:user._id,
        role:user.role

    },process.env.JWT_SECRET)
    res.cookie('token',token)

    return res.status(201).json({
        message:"user registered successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email,
            fullName:user.fullName,
            role:user.role
        }
    });
}

async function loginUser(req,res){
    const {email,password}=req.body;
    console.log("Email from postman",email);
    const users = await userModel.find({});
    console.log("All users in DB: ", users);
    const user=await userModel.findOne({email});
    console.log("User found: ",user);
    if(!user){
        return res.status(401).json({
            message:'email does not exist'
        })
    }
    const isPasswordValid=await bcrypt.compare(
        password,
        user.password
    );
    if(!isPasswordValid){
        return res.status(401).json({
            message:'invalid password'
        })
    }
    const token=jwt.sign({
        id:user._id,
        role:user.role

    },process.env.JWT_SECRET)

    res.cookie('token',token)
    res.status(200).json({
        message:"Login successful",
        user:{
            id:user._id,
            fullName:user.fullName,
            username:user.username,
            email:user.email,
            role:user.role
        }
    })
}


module.exports={ register, loginUser }