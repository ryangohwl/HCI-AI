import React, { useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onLoginButtonClick = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/user/66a3bb91b1e3a7dcc42876d0"
      );
      const user = response.data;
      // Assuming the API returns user data with properties `username` and `password`
      if (user.username === username && user.password === password) {
        navigate("/home");
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError("Failed to log in");
    }
  }, [username, password, navigate]);
  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Enter") {
        onLoginButtonClick();
      }
    },
    [onLoginButtonClick]
  );

  return (
    <div className="w-full relative h-[100vh] overflow-hidden bg-[url('/public/login@3x.png')] bg-cover bg-no-repeat bg-[top] text-left text-5xl text-dimgray font-jaldi">
      <div className='absolute top-0 left-0 w-full h-full flex items-start justify-center'>
        <div className='transform scale-75 origin-top'>
          <section className='shadow-[7px_7px_50px_7px_rgba(0,_0,_0,_0.1)] rounded-t-none rounded-b-81xl bg-white w-[500px] h-[850px]' />
          <img
            className='absolute top-[72px] left-[calc(50%_-_190px)] w-[380px] h-[237px] object-cover'
            alt=''
            src='/logo-group@2x.png'
          />
          <div className='absolute top-[405px] left-[calc(50%_-_188px)] w-[370px] h-[189px]'>
            <div className='absolute top-[0px] left-[calc(50%_-_185px)] w-[370px] h-[86px]'>
              <input
                className='[border:none] [outline:none] font-caption-2 text-xl bg-linen-200 absolute top-[36px] left-[calc(50%_-_185px)] shadow-[2px_2px_10px_rgba(0,_0,_0,_0.1)_inset] rounded-3xs w-[370px] h-[50px] py-[13px] px-[15px] box-border text-black'
                placeholder='eg. John Doe'
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e)}
              />
              <div className='absolute top-[0px] left-[0px]'>
                Username/Email
              </div>
            </div>
            <div className='absolute top-[103px] left-[calc(50%_-_185px)] w-[370px] h-[86px]'>
              <input
                className='[border:none] [outline:none] bg-linen-200 absolute top-[36px] left-[calc(50%_-_185px)] shadow-[2px_2px_10px_rgba(0,_0,_0,_0.1)_inset] rounded-3xs w-[370px] h-[50px] py-[13px] px-[15px] box-border font-caption-2 text-xl text-black'
                placeholder='eg. 12345'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e)}
              />
              <div className='absolute top-[0px] left-[0px]'>Password</div>
            </div>
          </div>
          <button className='cursor-pointer [border:none] p-0 bg-[transparent] absolute top-[709px] left-[calc(50%_-_68px)] text-xl font-jaldi text-gray text-left inline-block hover:text-darkslategray'>
            Forgot password?
          </button>
          <button
            className='cursor-pointer [border:none] p-0 bg-[transparent] absolute top-[648px] left-[calc(50%_-_119px)] w-[238px] h-[50px]'
            onClick={onLoginButtonClick}
          >
            <div className='absolute top-[0px] shadow-[4px_4px_4px_rgba(0,_0,_0,_0.1)] rounded-3xs bg-orange w-[238px] h-[50px] hover:bg-darkgoldenrod-100' />
            <b className='absolute top-[4px] left-[calc(50%_-_28px)] text-5xl font-jaldi text-white text-center'>
              Log In
            </b>
          </button>
          {error && <p className='text-red-500 text-center'>{error}</p>}
        </div>
      </div>
    </div>
  );
};
export default Login;

// import { FunctionComponent, useCallback, useState,useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const Login: FunctionComponent = () => {
//   const [username, setUsername] = useState('')
//   const [password, setPassword]= useState('')
//   const navigate = useNavigate();

//   const onLoginButtonClick = useCallback(() => {
//     navigate("/home");
//   }, [navigate]);

//   return (
//     <div className="w-full relative h-[100vh] overflow-hidden bg-[url('/public/login@3x.png')] bg-cover bg-no-repeat bg-[top] text-left text-5xl text-dimgray font-jaldi">
//       <div className="absolute top-0 left-0 w-full h-full flex items-start justify-center">
//         <div className="transform scale-75 origin-top">
//           <section className="shadow-[7px_7px_50px_7px_rgba(0,_0,_0,_0.1)] rounded-t-none rounded-b-81xl bg-white w-[500px] h-[850px]" />
//           <img
//             className="absolute top-[72px] left-[calc(50%_-_190px)] w-[380px] h-[237px] object-cover"
//             alt=""
//             src="/logo-group@2x.png"
//           />
//           <div className="absolute top-[405px] left-[calc(50%_-_188px)] w-[370px] h-[189px]">
//             <div className="absolute top-[0px] left-[calc(50%_-_185px)] w-[370px] h-[86px]">
//               <input
//                 className="[border:none] [outline:none] font-caption-2 text-xl bg-linen-200 absolute top-[36px] left-[calc(50%_-_185px)] shadow-[2px_2px_10px_rgba(0,_0,_0,_0.1)_inset] rounded-3xs w-[370px] h-[50px] py-[13px] px-[15px] box-border text-black"
//                 placeholder="username@gmail.com"
//                 type="text"
//               />
//               <div className="absolute top-[0px] left-[0px]">Username/Email</div>
//             </div>
//             <div className="absolute top-[103px] left-[calc(50%_-_185px)] w-[370px] h-[86px]">
//               <input
//                 className="[border:none] [outline:none] bg-linen-200 absolute top-[36px] left-[calc(50%_-_185px)] shadow-[2px_2px_10px_rgba(0,_0,_0,_0.1)_inset] rounded-3xs w-[370px] h-[50px] py-[13px] px-[15px] box-border font-caption-2 text-xl text-black"
//                 type="password"
//               />
//               <div className="absolute top-[0px] left-[0px]">Password</div>
//             </div>
//           </div>
//           <button className="cursor-pointer [border:none] p-0 bg-[transparent] absolute top-[709px] left-[calc(50%_-_68px)] text-xl font-jaldi text-gray text-left inline-block hover:text-darkslategray">
//             Forgot password?
//           </button>
//           <button
//             className="cursor-pointer [border:none] p-0 bg-[transparent] absolute top-[648px] left-[calc(50%_-_119px)] w-[238px] h-[50px]"
//             onClick={onLoginButtonClick}
//           >
//             <div className="absolute top-[0px] left-[calc(50%_-_119px)] shadow-[4px_4px_4px_rgba(0,_0,_0,_0.1)] rounded-3xs bg-orange w-[238px] h-[50px] hover:bg-darkgoldenrod-100" />
//             <b className="absolute top-[4px] left-[calc(50%_-_28px)] text-5xl font-jaldi text-white text-center">
//               Log In
//             </b>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
