import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const Login: FunctionComponent = () => {
  const navigate = useNavigate();

  const onLoginButtonClick = useCallback(() => {
    navigate("/home");
  }, [navigate]);

  return (
    <div className="w-screen h-screen flex items-start justify-center bg-[url('/public/login@3x.png')] bg-cover bg-no-repeat bg-top text-left text-5xl text-dimgray font-jaldi">
      <section className="shadow-[7px_7px_50px_7px_rgba(0,_0,_0,_0.1)] rounded-t-none rounded-b-81xl bg-white w-[500px] h-[850px] relative mt-0 flex flex-col items-center pt-[20px]">
        <img
          className="w-[380px] h-[237px] object-cover mt-[72px]"
          alt=""
          src="/logo-group@2x.png"
        />
        <div className="w-[370px] mt-[96px]">
          <div className="w-[370px] h-[86px] mb-[17px]">
            <input
              className="[border:none] [outline:none] font-caption-2 text-xl bg-linen-200 shadow-[2px_2px_10px_rgba(0,_0,_0,_0.1)_inset] rounded-3xs w-[370px] h-[50px] py-[13px] px-[15px] box-border text-black"
              placeholder="username@gmail.com"
              type="text"
            />
            <div className="text-left mt-[10px]">Username/Email</div>
          </div>
          <div className="w-[370px] h-[86px]">
            <input
              className="[border:none] [outline:none] bg-linen-200 shadow-[2px_2px_10px_rgba(0,_0,_0,_0.1)_inset] rounded-3xs w-[370px] h-[50px] py-[13px] px-[15px] box-border font-caption-2 text-xl text-black"
              type="password"
              placeholder="Password"
            />
            <div className="text-left mt-[10px]">Password</div>
          </div>
        </div>
        <button
          className="cursor-pointer [border:none] bg-[transparent] text-xl font-jaldi text-gray hover:text-darkslategray mt-[30px]"
        >
          Forgot password?
        </button>
        <button
          className="cursor-pointer [border:none] bg-[transparent] mt-[30px] w-[238px] h-[50px] relative"
          onClick={onLoginButtonClick}
        >
          <div className="shadow-[4px_4px_4px_rgba(0,_0,_0,_0.1)] rounded-3xs bg-orange w-[238px] h-[50px] hover:bg-darkgoldenrod-100" />
          <b className="absolute top-[4px] left-0 w-full text-center text-5xl font-jaldi text-white">
            Log In
          </b>
        </button>
      </section>
    </div>
  );
};

export default Login;
