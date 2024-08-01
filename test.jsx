import React,{useEffect} from 'react'
import axios from 'axios'


function Test() {    
    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get('${import.meta.env.VITE_BASE_URL}/user/66a3bb91b1e3a7dcc42876d0');
            // console.log(response)

        };
    
            fetchUser();
        }, []);
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  )
}
export default Test

