import React,{useEffect} from 'react'
import axios from 'axios'


function GetUser() {    
    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get('http://localhost:3000/user/66a3bb91b1e3a7dcc42876d0');
            console.log(response)

        };
    
            fetchUser();
        }, []);
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  )
}
export default GetUser