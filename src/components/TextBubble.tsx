import { FunctionComponent, useMemo, type CSSProperties } from "react";

export type TextBubbleType = {
  className?: string;
  typeSomething?: string;
  avatar?: string;

  /** Style props */
  property1BluePosition?: CSSProperties["position"];
  property1BlueTop?: CSSProperties["top"];
  property1BlueLeft?: CSSProperties["left"];
  property1BlueFilter?: CSSProperties["filter"];
  property1BlueWidth?: CSSProperties["width"];
};

const TextBubble: FunctionComponent<TextBubbleType> = ({
  className = "",
  typeSomething,
  avatar,
  property1BluePosition,
  property1BlueTop,
  property1BlueLeft,
  property1BlueFilter,
  property1BlueWidth,
}) => {
  const property1BlueStyle: CSSProperties = useMemo(() => {
    return {
      position: property1BluePosition,
      top: property1BlueTop,
      left: property1BlueLeft,
      filter: property1BlueFilter,
      width: property1BlueWidth,
    };
  }, [
    property1BluePosition,
    property1BlueTop,
    property1BlueLeft,
    property1BlueFilter,
    property1BlueWidth,
  ]);

  return (
    <div
      className={`max-w-full flex flex-row items-start justify-start py-3 px-2 box-border text-left text-[21px] text-black font-caption-2 ${className}`}
      style={property1BlueStyle}
    >
      <div className="rounded-2xl bg-cornflowerblue overflow-hidden flex flex-col items-center justify-start p-6">
        <div className="w-[392px] relative tracking-[0.02em] leading-[144%] font-medium inline-block">
          {typeSomething}
        </div>
      </div>
      <img
        className="w-3.5 relative h-[74px] object-contain"
        alt=""
        src={avatar}
      />
    </div>
  );
};

export default TextBubble;
