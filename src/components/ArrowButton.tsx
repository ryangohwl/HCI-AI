import { FunctionComponent, useMemo, type CSSProperties } from "react";

export type ArrowButtonType = {
  className?: string;
  iconAndroid24ChevronIconA?: string;

  /** Style props */
  iconAndroid24ChevronWidth?: CSSProperties["width"];
  iconAndroid24ChevronHeight?: CSSProperties["height"];
  iconAndroid24ChevronPosition?: CSSProperties["position"];
  iconAndroid24ChevronTop?: CSSProperties["top"];
  iconAndroid24ChevronRight?: CSSProperties["right"];
  iconAndroid24ChevronBottom?: CSSProperties["bottom"];
  iconAndroid24ChevronLeft?: CSSProperties["left"];
  iconAndroid24ChevronMaxHeight?: CSSProperties["maxHeight"];
};

const ArrowButton: FunctionComponent<ArrowButtonType> = ({
  className = "",
  iconAndroid24ChevronIconA,
  iconAndroid24ChevronWidth,
  iconAndroid24ChevronHeight,
  iconAndroid24ChevronPosition,
  iconAndroid24ChevronTop,
  iconAndroid24ChevronRight,
  iconAndroid24ChevronBottom,
  iconAndroid24ChevronLeft,
  iconAndroid24ChevronMaxHeight,
}) => {
  const iconAndroid24ChevronStyle: CSSProperties = useMemo(() => {
    return {
      width: iconAndroid24ChevronWidth,
      height: iconAndroid24ChevronHeight,
      position: iconAndroid24ChevronPosition,
      top: iconAndroid24ChevronTop,
      right: iconAndroid24ChevronRight,
      bottom: iconAndroid24ChevronBottom,
      left: iconAndroid24ChevronLeft,
      maxHeight: iconAndroid24ChevronMaxHeight,
    };
  }, [
    iconAndroid24ChevronWidth,
    iconAndroid24ChevronHeight,
    iconAndroid24ChevronPosition,
    iconAndroid24ChevronTop,
    iconAndroid24ChevronRight,
    iconAndroid24ChevronBottom,
    iconAndroid24ChevronLeft,
    iconAndroid24ChevronMaxHeight,
  ]);

  return (
    <img
      className={`w-6 max-w-full overflow-hidden h-6 ${className}`}
      alt=""
      src={iconAndroid24ChevronIconA}
      style={iconAndroid24ChevronStyle}
    />
  );
};

export default ArrowButton;
