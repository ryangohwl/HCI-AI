import { FunctionComponent } from "react";
import NewMindMapCard from "./NewMindMapCard";
import OldMindMap from "./OldMindMap";

export type CardsType = {
  className?: string;
};

const Cards: FunctionComponent<CardsType> = ({ className = "" }) => {
  return (
    <section
      className={`absolute top-[448px] left-[calc(50%_-_682.5px)] flex flex-row flex-wrap items-center justify-center gap-[55px] text-left text-xl text-black font-jaldi lg:flex-row lg:flex-wrap lg:items-center lg:justify-center md:flex-col md:items-center md:justify-center ${className}`}
    >
      <NewMindMapCard />
      <OldMindMap />
      <OldMindMap />
      <OldMindMap />
    </section>
  );
};

export default Cards;