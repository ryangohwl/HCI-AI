import { FunctionComponent } from "react";
import OldCards from "./OldCards";
import NewCard from "./NewCard";

export type CardsGroupType = {
  className?: string;
};

const CardsGroup: FunctionComponent<CardsGroupType> = ({ className = "" }) => {
  return (
    <section
      className={`absolute top-[443px] left-[calc(50%_-_682px)] w-[1365px] h-[300px] text-left text-xl text-black font-jaldi ${className}`}
    >
      <OldCards />
      <OldCards component6Left="calc(50% + 27.5px)" />
      <OldCards component6Left="calc(50% - 327.5px)" />
      <NewCard />
    </section>
  );
};

export default CardsGroup;