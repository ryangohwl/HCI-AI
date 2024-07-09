import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

export type NavBarType = {
  className?: string;
};

const NavBar: FunctionComponent<NavBarType> = ({ className = "" }) => {
  return (
    <nav
      className={`m-0 absolute top-[calc(50%_-_491px)] left-[calc(50%_-_756px)] w-[1513px] h-[86px] text-left text-13xl text-steelblue font-super-easy ${className}`}
    >
      <div className="absolute w-full top-[0px] right-[0px] left-[0px] shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] bg-lightskyblue-100 h-[86px]" />
      <img
        className="absolute h-[60.47%] w-[24.59%] top-[19.77%] right-[72.04%] bottom-[19.77%] left-[3.37%] max-w-full overflow-hidden max-h-full object-cover"
        alt=""
        src="/brainstormio-transparent-updated-1@2x.png"
      />
      <Link
        className="cursor-pointer [text-decoration:none] absolute h-[43.02%] w-[11.14%] top-[24.42%] right-[32.88%] bottom-[32.56%] left-[55.98%] text-[inherit] hover:animate-[1s_ease_0s_1_normal_none_pulsate] hover:opacity-[1]"
        to="/login"
      >
        <div className="absolute h-[89.19%] w-[85.46%] top-[0%] left-[0%] inline-block">
          Log Out
        </div>
        <img
          className="absolute h-[83.78%] w-[19.29%] top-[16.22%] right-[0%] bottom-[0%] left-[80.71%] max-w-full overflow-hidden max-h-full"
          alt=""
          src="/vector-29.svg"
        />
      </Link>
      <div className="absolute h-[58.14%] w-[19.83%] top-[24.42%] right-[3.7%] bottom-[17.44%] left-[76.47%] hover:animate-[1s_ease_0s_1_normal_none_pulsate] hover:opacity-[1]">
        <div className="absolute h-[58%] w-[83.33%] top-[8%] left-[0%] inline-block">
          Account Name
        </div>
        <img
          className="absolute h-full w-[16.67%] top-[0%] right-[0%] bottom-[0%] left-[83.33%] max-w-full overflow-hidden max-h-full"
          alt=""
          src="/component-11.svg"
        />
      </div>
    </nav>
  );
};

export default NavBar;
