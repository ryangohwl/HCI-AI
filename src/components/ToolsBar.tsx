import { FunctionComponent } from "react";

export type ToolsBarType = {
  className?: string;
};

const ToolsBar: FunctionComponent<ToolsBarType> = ({ className = "" }) => {
  return (
    <nav
      className={`m-0 absolute top-[0px] left-[calc(50%_-_697px)] w-[1394px] h-[91px] ${className}`}
    >
      <a className="[text-decoration:none] absolute top-[22px] left-[0px] w-[46px] h-[47px] overflow-hidden">
        <img
          className="absolute w-full top-[0px] right-[0px] left-[0px] max-w-full overflow-hidden h-[46px]"
          alt=""
          src="/icon--android--24--chevronleft.svg"
        />
      </a>
      <div className="absolute top-[22px] left-[231px] w-[107px] h-[47px] overflow-hidden">
        <button className="cursor-pointer [border:none] p-0 bg-[transparent] absolute top-[0px] left-[0px] w-[107px] h-9">
          <button className="cursor-pointer [border:none] p-0 bg-[transparent] absolute w-[calc(100%_-_71px)] top-[0px] right-[0px] left-[71px] h-9">
            <img
              className="absolute top-[6.8px] left-[5.7px] w-[25.3px] h-[21.5px]"
              alt=""
              src="/.svg"
            />
          </button>
          <img
            className="absolute w-[calc(100%_-_71px)] top-[0px] right-[71px] left-[0px] max-w-full overflow-hidden h-9"
            alt=""
            src="/ios--icon--36--back-arrow-reply.svg"
          />
        </button>
      </div>
      <div className="absolute w-[calc(100%_-_739px)] top-[0px] right-[366px] left-[373px] shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-t-none rounded-b-41xl bg-linen-100 h-[91px]">
        <div className="absolute top-[20px] left-[48px] w-[560px] h-[50px]">
          <button className="cursor-pointer [border:none] p-0 bg-[transparent] absolute w-[calc(100%_-_510px)] top-[0px] right-[510px] left-[0px] h-[50px] hover:animate-[1s_ease_0s_1_normal_none_scale-up] hover:opacity-[1]">
            <div className="absolute w-full top-[0px] right-[0px] left-[0px] rounded-[50%] bg-white h-[50px] hover:bg-whitesmoke-500" />
            <img
              className="absolute w-[calc(100%_-_26px)] top-[13px] right-[13px] left-[13px] max-w-full overflow-hidden h-6"
              alt=""
              src="/figma-tool-icon-set--basic.svg"
            />
          </button>
          <button className="cursor-pointer [border:none] p-0 bg-[transparent] absolute w-[calc(100%_-_510px)] top-[0px] right-[425px] left-[85px] h-[50px]">
            <div className="absolute w-full top-[0px] right-[0px] left-[0px] rounded-[50%] bg-white h-[50px] hover:bg-whitesmoke-300" />
            <img
              className="absolute w-[calc(100%_-_26px)] top-[14px] right-[13px] left-[13px] max-w-full overflow-hidden h-6"
              alt=""
              src="/figma-tool-icon-set--basic1.svg"
            />
          </button>
          <button className="cursor-pointer [border:none] p-0 bg-[transparent] absolute w-[calc(100%_-_510px)] top-[0px] right-[340px] left-[170px] h-[50px]">
            <div className="absolute w-full top-[0px] right-[0px] left-[0px] rounded-[50%] bg-white h-[50px] hover:bg-gainsboro-100" />
            <img
              className="absolute w-[calc(100%_-_26px)] top-[13px] right-[13px] left-[13px] max-w-full overflow-hidden h-8"
              alt=""
              src="/tools.svg"
            />
          </button>
          <button className="cursor-pointer [border:none] p-0 bg-[transparent] absolute w-[calc(100%_-_510px)] top-[0px] right-[255px] left-[255px] h-[50px]">
            <div className="absolute w-full top-[0px] right-[0px] left-[0px] rounded-[50%] bg-white h-[50px] hover:bg-whitesmoke-200" />
            <img
              className="absolute w-[calc(100%_-_25px)] top-[9px] right-[13px] left-[12px] max-w-full overflow-hidden h-[33px]"
              alt=""
              src="/tools1.svg"
            />
          </button>
          <button className="cursor-pointer [border:none] p-0 bg-[transparent] absolute w-[calc(100%_-_510px)] top-[0px] right-[170px] left-[340px] h-[50px]">
            <div className="absolute w-full top-[0px] right-[0px] left-[0px] rounded-[50%] bg-white h-[50px] hover:bg-whitesmoke-100" />
            <img
              className="absolute w-[calc(100%_-_30px)] top-[13px] right-[15px] left-[15px] max-w-full overflow-hidden h-7"
              alt=""
              src="/tools2.svg"
            />
          </button>
          <button className="cursor-pointer [border:none] p-0 bg-[transparent] absolute w-[calc(100%_-_510px)] top-[0px] right-[86px] left-[424px] h-[50px]">
            <div className="absolute w-full top-[0px] right-[0px] left-[0px] rounded-[50%] bg-white h-[50px] hover:bg-whitesmoke-400" />
            <img
              className="absolute w-[calc(100%_-_31px)] top-[10px] right-[15px] left-[16px] max-w-full overflow-hidden h-5"
              alt=""
              src="/shape.svg"
            />
            <img
              className="absolute w-[calc(100%_-_32px)] top-[21px] right-[24px] left-[8px] max-w-full overflow-hidden h-[18px]"
              alt=""
              src="/shape1.svg"
            />
            <img
              className="absolute w-[calc(100%_-_32px)] top-[21px] right-[7px] left-[25px] max-w-full overflow-hidden h-[19px]"
              alt=""
              src="/shape2.svg"
            />
          </button>
          <button className="cursor-pointer [border:none] p-0 bg-[transparent] absolute w-[calc(100%_-_510px)] top-[0px] right-[0px] left-[510px] h-[50px]">
            <div className="absolute w-full top-[0px] right-[0px] left-[0px] rounded-[50%] bg-white h-[50px] hover:bg-whitesmoke-400" />
            <img
              className="absolute w-[calc(100%_-_26px)] top-[12px] right-[13px] left-[13px] max-w-full overflow-hidden h-6"
              alt=""
              src="/figjam.svg"
            />
          </button>
        </div>
      </div>
      <button className="cursor-pointer [border:none] p-0 bg-[transparent] absolute top-[20px] left-[1077px] w-[50px] h-[51px] overflow-hidden">
        <div className="absolute w-full top-[0px] right-[0px] left-[0px] h-[50px]">
          <div className="absolute w-full top-[0px] right-[0px] left-[0px] rounded-[50%] bg-navajowhite h-[50px] hover:bg-burlywood" />
          <img
            className="absolute w-[calc(100%_-_26px)] top-[13px] right-[12px] left-[14px] max-w-full overflow-hidden h-6"
            alt=""
            src="/update.svg"
          />
        </div>
      </button>
      <button className="cursor-pointer [border:none] p-0 bg-[transparent] absolute top-[20px] left-[calc(50%_+_497px)] w-[200px] h-[50px]">
        <div className="absolute top-[0px] left-[calc(50%_-_100px)] shadow-[4px_4px_4px_rgba(0,_0,_0,_0.1)] rounded-6xl bg-orange w-[200px] h-[50px] hover:bg-darkgoldenrod-200" />
        <div className="absolute top-[4px] left-[calc(50%_-_51px)] text-5xl font-jaldi text-white text-center">
          Summarise
        </div>
      </button>
    </nav>
  );
};

export default ToolsBar;
