const mongoose=require("mongoose")
const taskSchema=new mongoose.Schema({
    title:{
    type:String,
    required:true
    },

    description:{
    type:String,
    required:true
    },

    assignTo:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
    },

    date:{
    type:String,
    required:true
    },

    category:{
    type:String,
    required:true
    },
    active:{
        type:Boolean,
        default:false
    },

    newTask:{
        type:Boolean,
        default:true
    },

    completed:{
        type:Boolean,
        default:false
    },

    failed:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})
const Task=mongoose.model("task",taskSchema)

module.exports=Task;