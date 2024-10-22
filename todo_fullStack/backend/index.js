const express = require('express');
const cors = require('cors');
const {createTodo , updateTodo} = require('./types');
const { todo } = require('./db');

const PORT = process.env.PORT || 5000

const app = express()
app.use(express.json())
app.use(cors())

function validateTodo(req,res,next){
    const todo = req.body
    const isValid = createTodo.safeParse(todo)
    if (isValid.success) {
        next()
    } else {
        res.status(403).json({
            message : "INVALID INPUT" 
        })
    }
}

function validateId(req,res,next){
    const Id = req.body
    const isValid = updateTodo.safeParse(Id)
    if (isValid.success) {
        next()
    } else {
        res.status(403).json({
            message : "INVALID INPUT"
        })
    }
}

app.post('/todos' , validateTodo, (req,res)=>{
    const todoInput = req.body

    const newTodo = new todo({             // todo.create({})
        title : todoInput.title,
        description : todoInput.description,
        completed : todoInput.completed || false
    })

    newTodo.save()    
        .then((todo)=>{
            res.status(200).json({
                todo
            })
        })
        .catch((error)=>{
            console.log(`Error while saving todo to database ${error.message}`);
        })
})

app.put('/completed' ,validateId, async (req,res)=>{
    const id = req.body.id
    try {
        const completedTodo = await todo.findByIdAndUpdate(
            id, 
            {$set : {completed : true}}, 
            {new : true}
        )

        if (!completedTodo) {
            res.status(403).json({
                message : " completedTodo is a null i.e. todo not found"
            })
            return;
        }

        res.status(200).json({
            completedTodo
        })
    } catch (error) {
        console.log(`Error while marking to as completed from database ${error.message}`);
    }
})

app.get('/todos' , async (req,res)=>{
    try {
        const todos = await todo.find({})
        res.status(200).json({
            todos
        })
    } catch (error) {
        console.log(`Error while getting all todos from database ${error.message}`);
    }
})

app.all('*', (req,res)=>{
    res.status(404).json({
        message : "Invalid Route"
    })
})

app.listen(PORT , ()=>{
    console.log(`app is running on port ${PORT}`);
})