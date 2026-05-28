const taskModel=require("../models/task.model")
const userModel=require("../models/users.model")

// Create Task

const createTask=async(req,res)=>{
    try{
        const {title,description,assignTo,date,category}=req.body;
        // create task
       
        
        
        const task=await taskModel.create({

            title,description,assignTo,date,category
        })
        await userModel.findByIdAndUpdate(
            req.body.assignTo,
            {
                $inc:{
                    "taskCounts.newTask":1
                }
            }
        )
        res.status(201).json({
            message:"Task created successfully",
            task
        })
    }catch(err){
        console.error(err);
        res.status(500).json({
            message:"Error creating task"
        })
    }
}

// Get User Tasks
const getAllUserTasks=async(req,res)=>{
    try{
        const tasks=await taskModel.find()
            .populate("assignTo", "fullName userName")
        res.status(200).json({
            message:"Tasks retrieved successfully",
            tasks
        })
    }catch(err){
        console.error(err);
        res.status(500).json({
            message:"Error retrieving tasks"
        })
    }
}


const getUserTasks=async(req,res)=>{
    try{
        const tasks=await taskModel.find({
            assignTo:req.params.id

        })
        res.status(200).json({
            message:"Tasks retrieved successfully",
            tasks
        })
    }catch(err){
        console.error(err);
        res.status(500).json({
            message:"Error retrieving tasks"
        })
    }
}

const acceptTask=async(req,res)=>{
    try{
        const tasks = await taskModel.findByIdAndUpdate(req.params.id,
            {
                active:true,
                newTask:false
            },{new:true}
        );
        return res.status(201).json({
            message:"Task accepted",
            tasks
        });
    }catch(err){
        return res.status(500).json({
            message:"Error"
        })
    }
}

const completeTask = async (req, res) => {

  try {

    await taskModel.findByIdAndUpdate(req.params.id, {
      active: false,
      completed: true
    },{new:true});

    res.json({ message: "Task completed" });

  } catch (err) {
    res.status(500).json({ message: "Error" });
  }

};


const failTask = async (req, res) => {

  try {

    await taskModel.findByIdAndUpdate(req.params.id, {
      active: false,
      failed: true
    },{new:true});

    res.json({ message: "Task failed" });

  } catch (err) {
    res.status(500).json({ message: "Error" });
  }

};
module.exports={ createTask, getUserTasks, getAllUserTasks,acceptTask,completeTask,failTask}