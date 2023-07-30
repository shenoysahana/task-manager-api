const express = require('express')
const taskRouter = express.Router()
const taskData = require('../../tasks.json')
const validator = require('../helpers/validator')
const path = require('path')
const fs = require("fs")

// get all tasks
taskRouter.get("/",(req,res)=>{
    res.status(200).send(taskData)
})

// get task by id
taskRouter.get('/:id',(req,res)=>{
    const {id} = req.params

    const task = taskData.tasks.find(task => task.taskId === Number(id));
    if (!task) {
        return res.status(404).json({ message: 'task not found' });
    }
    
    return res.status(200).json(task);
})


//create a task 
taskRouter.post('/', (req, res) => {
  const task = req.body;
  let writePath = path.join(__dirname, '../../', 'tasks.json');
  if(validator.validateTaskInfo(task, taskData).status) {
    let taskResult = JSON.parse(JSON.stringify(taskData));
    taskResult.tasks.push(task);
    fs.writeFileSync(writePath, JSON.stringify(taskResult), {encoding:'utf8', flag:'w'});
    res.status(200);
    res.json(validator.validateTaskInfo(task, taskData));
  } else {
    res.status(400);
    res.json(validator.validateTaskInfo(task, taskData))
  }
});

//update a task
taskRouter.put("/:id",(req,res)=>{
    const {title,description,isCompleted} = req.body
    const {id} = req.params
    const indexFound = taskData.tasks.findIndex(task => task.taskId === Number(id));

  if (indexFound === -1) {
    return res.status(404).json({ message: 'task not found' });
  }

  const updatedTask = {
    taskId: Number(id),
    title,
    description,
    isCompleted,
   };

  taskData.tasks[indexFound] = updatedTask;
  let writePath = path.join(__dirname, '../../', 'tasks.json');
  fs.writeFileSync(writePath, JSON.stringify(taskData, null, 2));
  res.json(updatedTask);
})


//delete a task
taskRouter.delete('/:id', (req, res) => {
    const { id } = req.params;
    const taskIndex = taskData.tasks.findIndex(task => task.taskId === Number(id));
  
    if (taskIndex === -1) {
      return res.status(404).json({ message: 'task not found' });
    }
  
    taskData.tasks.splice(taskIndex, 1);
    let writePath = path.join(__dirname, '../../', 'tasks.json');
    fs.writeFileSync(writePath, JSON.stringify(taskData, null, 2));  
    return res.status(200).json(taskData);
  });


module.exports = taskRouter