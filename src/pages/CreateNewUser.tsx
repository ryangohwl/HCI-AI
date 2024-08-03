import React, { useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateNewUser: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const onRegisterButtonClick = useCallback(async () => {
    console.log(import.meta.env.VITE_BASE_URL);
    console.log(`Registering user: ${username}, ${password}`);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/create-user`,
        {
          username,
          password,
        }
      );
      console.log('Registration successful:', response.data);
      navigate("/", {
        replace: true,
      });
    } catch (error: any) {
      console.error('Registration error:', error.response?.data?.message || error.message);
      setError(error.response?.data?.message || "Registration failed. Please try again.");
    }
  }, [username, password, navigate]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        onRegisterButtonClick();
      }
    },
    [onRegisterButtonClick]
  );

  const onBackButtonClick = () => {
    navigate("/");
  };

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
                placeholder='Enter Username'
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <div className='absolute top-[0px] left-[0px]'>
                Username
              </div>
            </div>
            <div className='absolute top-[103px] left-[calc(50%_-_185px)] w-[370px] h-[86px]'>
              <input
                className='[border:none] [outline:none] bg-linen-200 absolute top-[36px] left-[calc(50%_-_185px)] shadow-[2px_2px_10px_rgba(0,_0,_0,_0.1)_inset] rounded-3xs w-[370px] h-[50px] py-[13px] px-[15px] box-border font-caption-2 text-xl text-black'
                placeholder='Enter Password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <div className='absolute top-[0px] left-[0px]'>Password</div>
            </div>
          </div>
          <button
            className='cursor-pointer [border:none] p-0 bg-[transparent] absolute top-[648px] left-[calc(50%_-_119px)] w-[238px] h-[50px]'
            onClick={onRegisterButtonClick}
          >
            <div className='absolute top-[0px] shadow-[4px_4px_4px_rgba(0,_0,_0,_0.1)] rounded-3xs bg-orange w-[238px] h-[50px] hover:bg-darkgoldenrod-100' />
            <b className='absolute top-[4px] left-[calc(50%_-_40px)] text-5xl font-jaldi text-white text-center'>
              Register
            </b>
          </button>
          {error && <p className='text-red-500 text-center' style={{ whiteSpace: 'pre-wrap' }}>{error}</p>}
          <button
            className='cursor-pointer [border:none] p-0 bg-[transparent] absolute top-[708px] left-[calc(50%_-_119px)] w-[238px] h-[50px]'
            onClick={onBackButtonClick}
          >
            <div className='absolute top-[0px] shadow-[4px_4px_4px_rgba(0,_0,_0,_0.1)] rounded-3xs bg-gray-500 w-[238px] h-[50px] hover:bg-gray-700' />
            <b className='absolute top-[4px] left-[calc(50%_-_30px)] text-5xl font-jaldi text-orange text-center'>
              Back
            </b>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateNewUser;
