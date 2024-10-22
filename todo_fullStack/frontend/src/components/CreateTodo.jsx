import React from 'react'
import { useState } from 'react'

function CreateTodo({fetchTodo}) {
    const [title, setTitle] = useState('')
    const [description, setdescription] = useState('')

    async function buttonClick(){
        const response = await fetch('http://localhost:5000/todos', {
            method : 'POST',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify({
                title : title,
                description : description
            })
        })
        const data = await response.json()
        if (data) {
            console.log('Todo created')
        }
        setTitle('')
        setdescription('')
        fetchTodo()
    }

    function getTitle(e){
        setTitle(e.target.value)
    }

    function getDescription(e){
        setdescription(e.target.value)
    }

    return (
        <>
            <input type='text' onChange={getTitle} placeholder='title' value={title}/><br/>
            <input type='text' onChange={getDescription} placeholder='description' value={description}/><br/>

            <button onClick={buttonClick}>Add Todo</button>
        </>
    )
}

export default CreateTodo
