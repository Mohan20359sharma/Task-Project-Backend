const express=require("express")
const taskController=require("../controller/task.controller")
const router=express.Router();

router.post("/tasks",taskController.createTask)
router.get("/tasks",taskController.getAllUserTasks)
router.get("/tasks/:id",taskController.getUserTasks)
router.patch("/accept/:_id",taskController.acceptTask)
router.patch("/complete/:_id",taskController.completeTask)
router.patch("/fail/:_id",taskController.failTask)

module.exports=router;