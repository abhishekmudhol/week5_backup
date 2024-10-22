import { useState } from 'react'
import './App.css'

function App() {

  console.log(`App called`);
  return (
    <>
      <Button  />
    </>
  )
}

function Button(){
  const [count, setCount] = useState(0)
  console.log(count);

  function buttonClicked(){
    setCount(count + 1)
  }
  return(
    <button onClick={buttonClicked}>couter {count}</button>
  )
  return React.createElement( 
    'button',
    {onClick : buttonClicked},
    `Counter ${count}`
  )
}



export default App
