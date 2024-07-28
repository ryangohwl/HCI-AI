import React,{useEffect,useCallback} from 'react'
import axios from 'axios'


export const validate = async(username,password) => {
  await axios.get(`http:localhost:3000/${username}`)
} 


// const onLoginButtonClick = useCallback(async () => {
//   try {
//     const response = await axios.get(
//       "http://localhost:3000/user/66a3bb91b1e3a7dcc42876d0"
//     );
//     const user = response.data;
//     if (user.username === username && user.password === password) {
//       navigate("/home");
//     } else {
//       setError("Invalid username or password");
//     }
//   } catch (err) {
//     console.error("Login failed:", err);
//     setError("Failed to log in");
//   }
// }, [username, password, navigate]);
// function GetUser() {    
//     useEffect(() => {
//         const fetchUser = async () => {
//           const requestOptions = {
//             method: 'GET',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(userData)
//           }
//             const response = await axios.get('http://localhost:3000/user',requestOptions);
//             console.log(response)
        

//         };
    
//             fetchUser();
//         }, []);
//   return ()
// }

