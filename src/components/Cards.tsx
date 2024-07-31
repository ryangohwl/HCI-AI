import { FunctionComponent } from "react";
import NewMindMapCard from "./NewMindMapCard";
import OldMindMap from "./OldMindMap";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export type CardsType = {
  className?: string;
  user_id: string;
};

const Cards: FunctionComponent<CardsType> = ({ className = "", user_id }) => {
  const user = useLocation().state.user;
  const userId = user._id;
  const username = user.username;
  const whiteboards = user.whiteboards;
  const [lastThreeWhiteboards, setLastThreeWhiteboards] = useState([]);
  const [boardIds, setBoardIds] = useState([]);

  useEffect(() => {
    const fetchLastThreeWhiteboards = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/whiteboard/lastthreewhiteboards/${userId}`
        );
        setLastThreeWhiteboards(response.data.displayBoards);
      } catch (error) {
        console.error("Error fetching whiteboards:", error);
      }
    };
    fetchLastThreeWhiteboards();
  }, [userId]);

  useEffect(() => {
    if (lastThreeWhiteboards.length > 0) {
      const ids = lastThreeWhiteboards.map((board) => board._id);
      setBoardIds(ids);
    }
  }, [lastThreeWhiteboards]);

  // console.log(boardIds);

  return (
    <section
      className={`absolute top-[448px] left-[calc(50%_-_682.5px)] flex flex-row flex-wrap items-center justify-center gap-[55px] text-left text-xl text-black font-jaldi lg:flex-row lg:flex-wrap lg:items-center lg:justify-center md:flex-col md:items-center md:justify-center ${className}`}
    >
      <NewMindMapCard user_id={user_id} />
      {boardIds.length > 0 && (
        <OldMindMap boardId={boardIds[0]} userId={user_id} />
      )}
      {boardIds.length > 1 && (
        <OldMindMap boardId={boardIds[1]} userId={user_id} />
      )}
      {boardIds.length > 2 && (
        <OldMindMap boardId={boardIds[2]} userId={user_id} />
      )}
    </section>
  );
};

export default Cards;
