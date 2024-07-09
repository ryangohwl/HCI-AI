import { FunctionComponent, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export type NewCardType = {
  className?: string;
};

const NewCard: FunctionComponent<NewCardType> = ({ className = "" }) => {
  const navigate = useNavigate();

  const onNewMindMapClick = useCallback(() => {
    navigate("/new-workspace");
  }, [navigate]);

  useEffect(() => {
    const scrollAnimElements = document.querySelectorAll(
      "[data-animate-on-scroll]"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            const targetElement = entry.target;
            targetElement.classList.add("animate");
            observer.unobserve(targetElement);
          }
        }
      },
      {
        threshold: 0.15,
      }
    );

    for (let i = 0; i < scrollAnimElements.length; i++) {
      observer.observe(scrollAnimElements[i]);
    }

    return () => {
      for (let i = 0; i < scrollAnimElements.length; i++) {
        observer.unobserve(scrollAnimElements[i]);
      }
    };
  }, []);
  return (
    <div
      className={`absolute top-[0px] left-[calc(50%_-_682.5px)] w-[300px] h-[300px] [&.animate]:animate-[1s_ease_0s_1_normal_forwards_shadow-drop-bottom] opacity-[1] cursor-pointer text-center text-xl text-black font-jaldi hover:animate-[1s_ease_0s_1_normal_none_shadow-drop-bottom] hover:opacity-[1] ${className}`}
      onClick={onNewMindMapClick}
      data-animate-on-scroll
    >
      <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%]">
        <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-xl bg-lightsteelblue-100" />
        <img
          className="absolute h-[74.67%] w-full top-[0%] right-[0%] bottom-[25.33%] left-[0%] rounded-t-xl rounded-b-none max-w-full overflow-hidden max-h-full object-cover"
          alt=""
          src="/image-1@2x.png"
        />
      </div>
      <b className="absolute h-[8%] w-[79.33%] top-[80.67%] left-[10.33%] inline-block">
        New mind map
      </b>
      <img
        className="absolute h-[23.33%] w-[23.33%] top-[31%] right-[38.33%] bottom-[45.67%] left-[38.33%] max-w-full overflow-hidden max-h-full"
        alt=""
        src="/component-4.svg"
      />
    </div>
  );
};

export default NewCard;
