import { FunctionComponent } from "react";

export type OldMindMapType = {
  className?: string;
};

const OldMindMap: FunctionComponent<OldMindMapType> = ({ className = "" }) => {
  
  return (
    <div
      className={`w-[300px] relative h-[300px] text-left text-xl text-black font-jaldi hover:animate-[1s_ease_0s_1_normal_none_shadow-drop-bottom] hover:opacity-[1] ${className}`}
    >
      <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%]">
        <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-xl bg-lavender" />
        <img
          className="absolute h-[74.67%] w-full top-[0%] right-[0%] bottom-[25.33%] left-[0%] rounded-t-xl rounded-b-none max-w-full overflow-hidden max-h-full object-cover"
          alt=""
          src="/image-1@2x.png"
        />
      </div>
      <div className="absolute h-[8%] w-[79.33%] top-[79.67%] left-[4.33%] inline-block">
        Name of mind map
      </div>
      <div className="absolute h-[6%] w-[44.67%] top-[87.67%] left-[4.33%] text-mini inline-block">
        Last Edited: [date]
      </div>
    </div>
  );
};

export default OldMindMap;
