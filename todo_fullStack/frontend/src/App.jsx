import { useEffect, useState } from 'react'
import './App.css'
import CreateTodo from './components/CreateTodo'
import Todo from './components/Todo'
import Checkbox from './components/Checkbox'

function App() {
  const [todos, setTodos] = useState([])
  async function fetchTodo() {
    try {
      const response = await fetch('http://localhost:5000/todos')
      const todoRecieved = await response.json()
      setTodos(todoRecieved.todos)

    } catch (error) {
      console.error('Error while fetching todos', error.message)
    }
  }

  useEffect(() => {
    fetchTodo()
  }, [])

  return (
    <>
      {
        todos.length == 0 ? (
          <div>loding....</div>
        ) : (
          <div>
            <CreateTodo fetchTodo = {fetchTodo} />
            {
              todos.map((item) => {
                return <div key={item._id}>
                  <Todo title={item.title} description={item.description} />
                  <Checkbox id={item._id}/>
                </div>
              })
            }
          </div>
        )
      }
    </>
  )
}

export default App;

