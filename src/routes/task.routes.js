const express=require("express")
const taskController=require("../controller/task.controller")
const router=express.Router();

router.post("/tasks",taskController.createTask)
router.get("/tasks",taskController.getAllUserTasks)
router.get("/tasks/:id",taskController.getUserTasks)
router.patch("/accept/:id",taskController.acceptTask)
router.patch("/complete/:id",taskController.completeTask)
router.patch("/fail/:id",taskController.failTask)

module.exports=router;