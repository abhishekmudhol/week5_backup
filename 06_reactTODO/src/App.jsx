import { useState } from 'react'
import './App.css'

let uniqueId = 1

function App() {
  // console.log(`App called`);
  const [title , setTitle] = useState('')
  const [description , setDescription] = useState('')
  const [todo, setTodo] = useState([
    {
      id : 1,
      title : "Temple",
      description : "go to a Temple",
      completed : false
    }
  ])
  
  function addToDo(){
      setTodo([...todo ,  {
        id : ++uniqueId ,
        title : title,
        description : description
      }])
      setTitle('')
      setDescription('')
  }

  function handleCheckbox(Id){
    setTodo(
      todo.map((item)=>{
        return item.id == Id ? {...item , completed : !item.completed} : item
      })
    )
  }

  function getTitle(e){
    setTitle(e.target.value)
  }

  function getDescription(e){
    setDescription(e.target.value)
  }

  return (
    <>
    <input type='text' value={title} placeholder='title' onChange={getTitle}/><br></br>
    <input type='text' value={description} placeholder='description' onChange={getDescription}/> <br/><br/>
      <button onClick={addToDo} style={{}}>Add todo</button> <br/> <br/>

      {todo.map((item)=>{
        return <div key={item.id}>
          <Todo title={item.title} description={item.description} completed ={item.completed}/>
          <input
            type='checkbox'
            onChange={()=> handleCheckbox(item.id)}
          /><br/><br/>
        </div>
      })}
    </>
  )
}

function Todo(props){
  return(
    <>
      <b style={{color : 'orange'}}>title : {props.title}</b>
      <div>Desdcription : {props.description}</div>
      <b>{props.completed ? `Done` : `Not Done`}</b>
    </>
  )
}

export default App
