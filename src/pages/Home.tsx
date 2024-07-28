import { FunctionComponent } from "react";
import Cards from "../components/Cards";
import NavBar from "../components/NavBar";
import { useLocation } from "react-router-dom";
import { UserWhiteboards } from "../components/whiteboardDatabase/create_whiteboard";

const Home = () => {
  const location = useLocation();
  const username = location.state?.username || "Guest"; // Default to 'Guest' if no username is available

  return (
    <div className="w-full min-h-[100vh] overflow-x-auto overflow-y-auto bg-[url('/public/home@3x.png')] bg-cover bg-no-repeat bg-[top] text-left text-[96px] text-black font-jaldi">
      <UserWhiteboards />
      <Cards />
      <h1 className='w-full absolute top-[140px] left-[180px] text-inherit font-bold font-inherit inline-block w-[534px] h-[118px]'>
        Hello, {location.state.username}!
      </h1>
      <h2 className='m-0 absolute top-[344px] left-[189px] text-13xl font-normal font-inherit inline-block w-[427px] h-[53px]'>
        What will you map today?
      </h2>
      <NavBar />
    </div>
  );
};

export default Home;
