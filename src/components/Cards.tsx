import { FunctionComponent, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import NewMindMapCard from "./NewMindMapCard";
import OldMindMap from "./OldMindMap";

export type CardsType = {
  className?: string;
  user_id: string;
};

interface Whiteboard {
  _id: string;
  // Add other relevant properties here
}

const Cards: FunctionComponent<CardsType> = ({ className = "", user_id }) => {
  const user = useLocation().state.user;
  const userId = user._id;
  const [lastThreeWhiteboards, setLastThreeWhiteboards] = useState<
    Whiteboard[]
  >([]);
  const [boardIds, setBoardIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchLastThreeWhiteboards = async () => {
      try {
        const response = await axios.get(
          `{}}/${userId}`
        );
        setLastThreeWhiteboards(response.data.displayBoards); // Make sure your API matches this data structure
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

  return (
    <section
      className={`absolute top-[448px] left-[calc(50%_-_682.5px)] flex flex-row flex-wrap items-center justify-center gap-[55px] text-left text-xl text-black font-jaldi lg:flex-row lg:flex-wrap lg:items-center lg:justify-center md:flex-col md:items-center md:justify-center ${className}`}
    >
      <NewMindMapCard user_id={user_id} />
      {boardIds.map((id, index) => (
        <OldMindMap key={index} boardId={id} userId={user_id} />
      ))}
    </section>
  );
};

export default Cards;
