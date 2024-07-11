import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const Login: FunctionComponent = () => {
  const navigate = useNavigate();

  const onLoginButtonClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div className="w-full relative h-[982px] overflow-hidden bg-[url('/public/login@3x.png')] bg-cover bg-no-repeat bg-[top] text-left text-5xl text-dimgray font-jaldi">
      <section className="absolute top-[0px] left-[calc(50%_-_250px)] shadow-[7px_7px_50px_7px_rgba(0,_0,_0,_0.1)] rounded-t-none rounded-b-81xl bg-white w-[500px] h-[850px]" />
      <img
        className="absolute top-[72px] left-[calc(50%_-_190px)] w-[380px] h-[237px] object-cover"
        alt=""
        src="/logo-group@2x.png"
      />
      <div className="absolute top-[405px] left-[calc(50%_-_188px)] w-[370px] h-[189px]">
        <div className="absolute top-[0px] left-[calc(50%_-_185px)] w-[370px] h-[86px]">
          <input
            className="[border:none] [outline:none] font-caption-2 text-xl bg-linen-200 absolute top-[36px] left-[calc(50%_-_185px)] shadow-[2px_2px_10px_rgba(0,_0,_0,_0.1)_inset] rounded-3xs w-[370px] h-[50px] py-[13px] px-[15px] box-border text-black"
            placeholder="username@gmail.com"
            type="text"
          />
          <div className="absolute top-[0px] left-[0px]">Username/Email</div>
        </div>
        <div className="absolute top-[103px] left-[calc(50%_-_185px)] w-[370px] h-[86px]">
          <input
            className="[border:none] [outline:none] bg-linen-200 absolute top-[36px] left-[calc(50%_-_185px)] shadow-[2px_2px_10px_rgba(0,_0,_0,_0.1)_inset] rounded-3xs w-[370px] h-[50px] py-[13px] px-[15px] box-border font-caption-2 text-xl text-black"
            type="text"
          />
          <div className="absolute top-[0px] left-[0px]">Password</div>
        </div>
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