import { FunctionComponent, useCallback } from "react";
import ToolsBar from "../components/ToolsBar";
import TextBubble from "../components/TextBubble";

const NewWorkspace: FunctionComponent = () => {
  const onCapybaraImageClick = useCallback(() => {
    const anchor = document.querySelector("[data-scroll-to='rightChatBubble']");
    if (anchor) {
      anchor.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, []);

  return (
    <div className="w-full relative bg-white h-[982px] overflow-auto">
      <ToolsBar />
      <div className="absolute right-[39px] bottom-[0px] w-[237px] h-[272px] overflow-hidden">
        <img
          className="absolute top-[0px] left-[4px] w-[229px] h-[329px] object-cover cursor-pointer"
          alt=""
          src="/capybara@2x.png"
          onClick={onCapybaraImageClick}
        />
        <button className="cursor-pointer [border:none] p-0 bg-[transparent] absolute top-[0px] left-[-52px] w-[328px] h-[728px] overflow-hidden hidden">
          <div className="absolute top-[272px] left-[0px] w-[328px] h-[456px]">
            <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%]">
              <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-t-lg rounded-b-none bg-white box-border overflow-hidden flex flex-col items-start justify-start border-[1px] border-solid border-lightsteelblue-200">
                <div className="self-stretch shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] bg-lavender flex flex-row items-center justify-between py-2 px-2.5 border-b-[1px] border-solid border-stroke-1">
                  <div className="flex flex-row items-center justify-start gap-[8px]">
                    <div className="flex flex-row items-center justify-start">
                      <img
                        className="w-8 relative h-8 object-cover"
                        alt=""
                        src="/group-1272628206@2x.png"
                      />
                    </div>
                    <div className="w-0 relative h-0">
                      <div className="absolute top-[0px] left-[0px] rounded-[64px] bg-state-active w-[8.2px] h-[8.2px] hidden" />
                    </div>
                  </div>
                  <div className="flex flex-row items-start justify-start">
                    <img
                      className="w-5 relative h-5 overflow-hidden shrink-0"
                      alt=""
                      src="/frame.svg"
                    />
                  </div>
                </div>
                <div className="overflow-hidden flex flex-row items-end justify-end">
                  <div className="w-[312px] bg-aliceblue h-[348px] flex flex-col items-end justify-end pt-0 px-4 pb-1.5 box-border">
                    <div className="w-[269.9px] h-[47px] flex flex-row items-center justify-center py-4 px-0 box-border">
                      <div className="relative text-xs font-medium font-caption-2 text-text-secondary text-left">
                        Wed 6:55 AM
                      </div>
                    </div>
                    <div className="self-stretch flex flex-col items-start justify-start gap-[12px]">
                      <div className="self-stretch flex flex-col items-start justify-start">
                        <div className="rounded-t-xl rounded-br-xl rounded-bl-none bg-rosybrown box-border overflow-hidden flex flex-row items-center justify-center py-2.5 px-[15px] min-w-[36px] max-w-[238px] border-[1px] border-solid border-white">
                          <div className="flex-1 relative text-mini font-caption-2 text-text-brand text-left">
                            I would be glad to help
                          </div>
                        </div>
                      </div>
                      <div className="self-stretch flex flex-col items-end justify-end gap-[4px]">
                        <div className="rounded-t-xl rounded-br-none rounded-bl-xl bg-lightskyblue-200 box-border overflow-hidden flex flex-row items-center justify-center py-2.5 px-[15px] min-w-[36px] max-w-[238px] border-[1px] border-solid border-white">
                          <div className="flex-1 relative text-mini font-caption-2 text-text-brand text-left">
                            Actually there is.
                          </div>
                        </div>
                        <div className="rounded-t-xl rounded-br-none rounded-bl-xl bg-lightskyblue-200 box-border overflow-hidden flex flex-row items-center justify-center py-2.5 px-[15px] min-w-[36px] max-w-[238px] border-[1px] border-solid border-white">
                          <div className="flex-1 relative text-mini font-caption-2 text-text-brand text-left">
                            ........
                          </div>
                        </div>
                        <div className="rounded-t-xl rounded-br-none rounded-bl-xl bg-lightskyblue-200 box-border overflow-hidden flex flex-row items-center justify-center py-2.5 px-[15px] min-w-[36px] max-w-[238px] border-[1px] border-solid border-white">
                          <div className="flex-1 relative text-mini font-caption-2 text-text-brand text-left">
                            ........
                          </div>
                        </div>
                        <div className="flex flex-row items-end justify-end py-1 px-0">
                          <div className="relative text-xs font-caption-2 text-text-secondary text-right">
                            Sent 16h ago
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gainsboro-200 h-[348px] flex flex-col items-start justify-between py-0 px-px box-border">
                    <img
                      className="w-3.5 relative h-3.5 overflow-hidden shrink-0"
                      alt=""
                      src="/fi-7185279.svg"
                    />
                    <div className="flex flex-col items-center justify-start">
                      <div className="w-3 relative rounded-md bg-white h-10" />
                      <img
                        className="w-3.5 relative h-3.5 overflow-hidden shrink-0"
                        alt=""
                        src="/fi-71852791.svg"
                      />
                    </div>
                  </div>
                </div>
                <div className="self-stretch bg-white flex flex-row items-center justify-start py-3 px-2.5 gap-[8px]">
                  <img
                    className="w-6 relative h-6 overflow-hidden shrink-0 object-cover"
                    alt=""
                    src="/frame1@2x.png"
                  />
                  <img
                    className="w-6 relative h-6 overflow-hidden shrink-0 object-cover"
                    alt=""
                    src="/image-fill@2x.png"
                  />
                  <input
                    className="[border:none] [outline:none] font-caption-2 text-[14px] bg-gainsboro-200 w-52 relative rounded-[29px] h-9 pt-[9px] px-[15.8px] pb-2.5 box-border text-darkgray"
                    placeholder="Type here..."
                    type="text"
                  />
                  <button className="cursor-pointer [border:none] p-0 bg-[transparent] w-7 relative h-7">
                    <div className="absolute top-[0px] left-[0px] w-7 h-7">
                      <div className="absolute top-[0px] left-[0px] w-7 h-7" />
                    </div>
                    <img
                      className="absolute top-[4px] left-[4px] w-5 h-5 overflow-hidden"
                      alt=""
                      src="/frame2.svg"
                    />
                  </button>
                </div>
              </div>
            </div>
            <div className="absolute h-[6.14%] w-[39.63%] top-[2.41%] right-[46.04%] bottom-[91.45%] left-[14.33%]">
              <div className="absolute h-full w-full top-[0%] left-[0%] text-mini font-caption-2 text-dimgray text-left flex items-center">
                Capybara Friend
              </div>
            </div>
          </div>
        </button>
      </div>
      <TextBubble
        typeSomething="Click on me and ask me anything!"
        avatar="/avatar.svg"
        property1BluePosition="absolute"
        property1BlueTop="732px"
        property1BlueLeft="786px"
        property1BlueFilter="drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
        property1BlueWidth="462px"
      />
    </div>
  );
};

export default NewWorkspace;
