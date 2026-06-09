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

const acceptTask = async (req, res) => {
    try {
        const task = await taskModel.findByIdAndUpdate(  // ← const task = add kar
            req.params.id,
            { active: true, newTask: false },
            { returnDocument: 'after' }
        );

        if (!task) return res.status(404).json({ message: "Task not found" });

        await userModel.findByIdAndUpdate(task.assignTo, {
            $inc: {
                "taskCounts.newTask": -1,
                "taskCounts.active": 1
            }
        });

        return res.status(200).json({ message: "Task accepted", task });
    } catch (err) {
        console.error("acceptTask error:", err.message);
        return res.status(500).json({ message: "Error", error: err.message });
    }
}

const completeTask = async (req, res) => {
    try {
        const task = await taskModel.findByIdAndUpdate(  // ← const task = add karo
            req.params.id,
            { active: false, completed: true },
            { new: true }
        );

        if (!task) return res.status(404).json({ message: "Task not found" });

        await userModel.findByIdAndUpdate(task.assignTo, {
            $inc: {
                "taskCounts.active": -1,
                "taskCounts.completed": 1
            }
        });

        res.json({ message: "Task completed" });
    } catch (err) {
        res.status(500).json({ message: "Error", error: err.message });
    }
};

const failTask = async (req, res) => {
    try {
        const task = await taskModel.findByIdAndUpdate(  // ← const task = add karo
            req.params.id,
            { active: false, failed: true },
            { new: true }
        );

        if (!task) return res.status(404).json({ message: "Task not found" });

        await userModel.findByIdAndUpdate(task.assignTo, {
            $inc: {
                "taskCounts.active": -1,
                "taskCounts.failed": 1
            }
        });

        res.json({ message: "Task failed" });
    } catch (err) {
        res.status(500).json({ message: "Error", error: err.message });
    }
};
module.exports={ createTask, getUserTasks, getAllUserTasks,acceptTask,completeTask,failTask}