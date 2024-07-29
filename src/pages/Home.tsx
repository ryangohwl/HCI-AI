import { FunctionComponent, useEffect, useState, useCallback } from "react";
import Cards from "../components/Cards";
import NavBar from "../components/NavBar";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEditor } from "tldraw";

const Home: FunctionComponent = () => {
  const user = useLocation().state.user;
  const userId = user._id;
  const username = user.username;
  const whiteboards = user.whiteboards;
  const [lastThreeWhiteboards, setLastThreeWhiteboards] = useState([]);

  useEffect(() => {
    const fetchLastThreeWhiteboards = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/whiteboard/lastthreewhiteboards/${userId}`
        );
        setLastThreeWhiteboards(response.data.displayBoards);
        // console.log(response);
      } catch (error) {
        console.error("Error fetching whiteboards:", error);
      }
    };
    console.log("reached");
    fetchLastThreeWhiteboards();
  }, [userId]);

  useEffect(() => {
    if (lastThreeWhiteboards.length > 0) {
      lastThreeWhiteboards.forEach((whiteboard, index) => {
        console.log(`Whiteboard ${index + 1}:`, whiteboard);
        // const editor = useEditor();
        // const load = useCallback(async () => {
        //   const response = await axios.get(
        //     `http://localhost:3000/whiteboard/loadWhiteboard/${userId}/${boardId}`
        //   );
        //   const document = JSON.parse(response.data.document);
        //   const session = JSON.parse(response.data.session);
        //   console.log(document);
        // }, [editor]);
      });
    }
  }, [lastThreeWhiteboards]);
  return (
    <div className="w-full min-h-[100vh] overflow-x-auto overflow-y-auto bg-[url('/public/home@3x.png')] bg-cover bg-no-repeat bg-[top] text-left text-[96px] text-black font-jaldi">
      <Cards user_id={user._id} />
      <h1 className='m-0 absolute top-[207px] left-[189px] text-inherit font-bold font-inherit inline-block  h-[118px]'>
        Hello,!
      </h1>
      <h2 className='m-0 absolute top-[344px] left-[189px] text-13xl font-normal font-inherit inline-block w-[427px] h-[53px]'>
        What will you map today?
      </h2>
      <NavBar />
    </div>
  );
};

export default Home;
