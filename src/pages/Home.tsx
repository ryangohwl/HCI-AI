import { FunctionComponent, useEffect, useState, useCallback } from "react";
import Cards from "../components/Cards";
import NavBar from "../components/NavBar";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEditor } from "tldraw";

const Home: FunctionComponent = () => {
  const user = useLocation().state.user;
  const userId = user._id;

  return (
    <div className="w-full min-h-[100vh] overflow-x-auto overflow-y-auto bg-[url('/public/home@3x.png')] bg-cover bg-no-repeat bg-[top] text-left text-[96px] text-black font-jaldi">
      <Cards user_id={user._id} />
      <h1 className='m-0 absolute top-[100px] left-[180px] text-inherit font-bold font-inherit inline-block  h-[118px]'>
        Hello, {user.username}!
      </h1>
      <h2 className='m-0 absolute top-[222px] left-[189px] text-13xl font-normal font-inherit inline-block w-[427px] h-[53px]'>
        What will you map today?
      </h2>
      <NavBar />
    </div>
  );
};

export default Home;
