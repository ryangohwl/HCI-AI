import React,{useEffect} from 'react'

function CreateUser() {
    useEffect(() => {
        const addUser= async () => {
            const userData = {
                username: "John Doe",
                password: "12345",
            };
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            };
            const res = await fetch('http://localhost:3000/user', requestOptions)
            // console.log( res.json())
        };

        addUser();
    },[])
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  )
}

export default CreateUser

