function Checkbox(props){
    async function boxChecked(){
        const response = await fetch('http://localhost:5000/completed' ,{
            method : 'PUT',
            headers :{'Content-Type' : 'application/json'},
            body : JSON.stringify({
                id : props.id
            })
        })
        const data = await response.json()
        if (data) {
            console.log(`todo successfully marked as completed`);
        }
    }
    return(
        <>
            <input type="checkbox" onChange={boxChecked}/>
        </>
    )
}

export default Checkbox