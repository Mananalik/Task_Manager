import asyncHandler from "express-async-handler";
import TaskModel from "../../models/Tasks/TaskModel.js"

export const createTask = asyncHandler(async(req,res)=>{
    try{
        const {title,description,dueDate,priority,status}=req.body;
        if(!title || title.trim()===""){
         res.status(400).json({message:"Title is required"});
        }
        if(!description || description.trim()===""){
          res.status(400).json({message:"Description is requird"});
        }
        const task = new TaskModel({
            title,
            description,
            dueDate,
            priority,
            status,
            user: req.user._id,
        });
        await task.save();
        res.status(201).json(task);
    } catch(error){
        console.log("Error in createTask: ",error.message);
        res.status(500).json({message: error.message});
    }
});

// get all the tasks
export const getTasks = asyncHandler(async(req,res)=>{
try{
    const userId = req.user._id;
    if(!userId){
        res.status(400).json({message:"User not found"});
    }
    const tasks = await TaskModel.find({user: userId});
    res.status(200).json({
        length: tasks.length,
        tasks,
    });
}catch(error){
    console.log("Error in getTasks: ",error.message);
    res.status(500).json({message: error.message});
}
});

// get a task
export const getTask = asyncHandler(async (req,res)=>{

});