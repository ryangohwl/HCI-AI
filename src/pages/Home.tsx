import { FunctionComponent } from "react";
import CardsGroup from "../components/CardsGroup";
import NavBar from "../components/NavBar";
import ArrowButton from "../components/ArrowButton";

const Home: FunctionComponent = () => {
  return (
    <div className="w-full relative bg-white h-[982px] overflow-x-auto text-left text-[96px] text-black font-jaldi">
      <img
        className="absolute top-[0px] left-[0px] w-[1512px] h-[982px] object-cover"
        alt=""
        src="/white-background-cropped-1@2x.png"
      />
      <CardsGroup />
      <h1 className="m-0 absolute top-[239px] left-[74px] text-inherit font-bold font-inherit inline-block w-[534px] h-[118px]">
        Hello, User!
      </h1>
      <h2 className="m-0 absolute top-[376px] left-[74px] text-13xl font-normal font-inherit inline-block w-[427px] h-[53px]">
        What will you map today?
      </h2>
      <NavBar />
      <button className="cursor-pointer [border:none] p-0 bg-[transparent] absolute top-[558px] right-[29px] w-[70px] h-[70px]">
        <img
          className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full"
          alt=""
          src="/ellipse-2.svg"
        />
        <ArrowButton
          iconAndroid24ChevronIconA="/icon--android--24--chevronright.svg"
          iconAndroid24ChevronWidth="85.71%"
          iconAndroid24ChevronHeight="85.71%"
          iconAndroid24ChevronPosition="absolute"
          iconAndroid24ChevronTop="7.14%"
          iconAndroid24ChevronRight="7.14%"
          iconAndroid24ChevronBottom="7.14%"
          iconAndroid24ChevronLeft="7.14%"
          iconAndroid24ChevronMaxHeight="100%"
        />
      </button>
    </div>
  );
};

export default Home;
