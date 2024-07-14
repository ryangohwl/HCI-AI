import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export type NavBarType = {
  className?: string;
};

const NavBar: FunctionComponent<NavBarType> = ({ className = "" }) => {
  const navigate = useNavigate();

  const onLogoutGroupClick = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  return (
    <nav
      className={`m-0 fixed w-full top-0 h-[86px] text-left text-13xl text-steelblue font-super-easy z-1000 ${className}`}
    >
      <nav className="m-0 fixed w-full top-0 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] bg-lightskyblue-100 h-[86px]" />
      <img
        className="absolute top-[17px] left-[68px] w-[372px] h-[52px] object-cover"
        alt=""
        src="/brainstormio-transparent-updated-1@2x.png"
      />
      <div className="absolute top-[19px] right-[106px] w-[610px] h-[50px] flex flex-row items-start justify-start gap-[141px] lg:hidden">
        <button
          className="cursor-pointer [border:none] p-0 bg-[transparent] w-[168.5px] relative h-[37px]"
          onClick={onLogoutGroupClick}
        >
          <div className="absolute top-[0px] right-[24.5px] text-13xl font-super-easy text-steelblue text-left inline-block w-36 h-[33px]">
            Log Out
          </div>
          <img
            className="absolute top-[6px] right-[0px] w-[32.5px] h-[31px]"
            alt=""
            src="/vector-29.svg"
          />
        </button>
        <div className="w-[300px] relative h-[50px] hover:animate-[1s_ease_0s_1_normal_none_pulsate] hover:opacity-[1]">
          <div className="absolute top-[4px] right-[50px] inline-block w-[250px] h-[29px]">
            Account Name
          </div>
          <img
            className="absolute top-[0px] right-[0px] w-[50px] h-[50px]"
            alt=""
            src="/component-11.svg"
          />
        </div>
      </div>
      <img
        className="absolute top-[31px] right-[60px] w-7 h-[26px] hidden lg:flex"
        alt=""
        src="/line-1.svg"
      />
    </nav>
  );
};

export default NavBar;