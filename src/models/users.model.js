const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["admin","user"],
        default:"user"
    },
    taskCounts:{

        active:{
            type:Number,
            default:0
        },

        newTask:{
            type:Number,
            default:0
        },

        completed:{
            type:Number,
            default:0
        },

        failed:{
            type:Number,
            default:0
        }

    }
})
const User = mongoose.model("user", userSchema);
module.exports = User;