const express = require('express')
const app = express()
const {PORT} = require('./src/constants')
const taskRouter = require('./src/routes/taskInfo')

app.use(express.json())


app.get("/",(req,res)=>{
    res.send("Welcome to Task Manager RESTful API")
})


app.use('/tasks',taskRouter)

app.listen(PORT,(err)=>{
    if(err)
    console.log("There was an error in starting Server",err)
    else
    console.log(`Server running Successfully at ${PORT}`)
})


