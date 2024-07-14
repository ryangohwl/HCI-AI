import { FunctionComponent } from "react";
import Cards from "../components/Cards";
import NavBar from "../components/NavBar";

const Home: FunctionComponent = () => {
  return (
    <div className="w-full relative h-[982px] overflow-x-auto bg-[url('/public/home@3x.png')] bg-cover bg-no-repeat bg-[top] text-left text-[96px] text-black font-jaldi">
      <Cards />
      <h1 className="m-0 absolute top-[207px] left-[189px] text-inherit font-bold font-inherit inline-block w-[534px] h-[118px]">
        Hello, User!
      </h1>
      <h2 className="m-0 absolute top-[344px] left-[189px] text-13xl font-normal font-inherit inline-block w-[427px] h-[53px]">
        What will you map today?
      </h2>
      <NavBar />
    </div>
  );
};

export default Home;
