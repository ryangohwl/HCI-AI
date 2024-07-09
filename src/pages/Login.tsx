import { FunctionComponent, useCallback } from "react";
import UserInputGroup from "../components/UserInputGroup";
import { useNavigate } from "react-router-dom";

const Login: FunctionComponent = () => {
  const navigate = useNavigate();

  const onLoginButtonClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div className="w-full relative h-[982px] overflow-hidden bg-[url('/public/login@3x.png')] bg-cover bg-no-repeat bg-[top]">
      <div className="absolute top-[0px] left-[calc(50%_-_250px)] shadow-[7px_7px_50px_7px_rgba(0,_0,_0,_0.1)] rounded-t-none rounded-b-81xl bg-white w-[500px] h-[850px]" />
      <div className="absolute top-[72px] left-[calc(50%_-_190px)] w-[380px] h-[237px]">
        <img
          className="absolute top-[0px] left-[calc(50%_-_79px)] w-[157px] h-[181px] object-cover"
          alt=""
          src="/img-8794-1@2x.png"
        />
        <img
          className="absolute top-[183px] left-[calc(50%_-_190px)] w-[380px] h-[54px] object-cover"
          alt=""
          src="/brainstormio-logo@2x.png"
        />
      </div>
      <div className="absolute top-[405px] left-[calc(50%_-_188px)] w-[370px] h-[189px]">
        <UserInputGroup
          usernameEmail="Username/Email"
          usernamegmailcomPlacehold="username@gmail.com"
        />
        <UserInputGroup usernameEmail="Password" propTop="103px" />
      </div>
      <button className="cursor-pointer [border:none] p-0 bg-[transparent] absolute top-[709px] left-[calc(50%_-_68px)] text-xl font-jaldi text-gray text-left inline-block hover:text-darkslategray">
        Forgot password?
      </button>
      <button
        className="cursor-pointer [border:none] p-0 bg-[transparent] absolute top-[648px] left-[calc(50%_-_119px)] w-[238px] h-[50px]"
        onClick={onLoginButtonClick}
      >
        <div className="absolute top-[0px] left-[calc(50%_-_119px)] shadow-[4px_4px_4px_rgba(0,_0,_0,_0.1)] rounded-3xs bg-orange w-[238px] h-[50px] hover:bg-darkgoldenrod-100" />
        <b className="absolute top-[4px] left-[calc(50%_-_28px)] text-5xl font-jaldi text-white text-center">
          Log In
        </b>
      </button>
    </div>
  );
};

export default Login;
