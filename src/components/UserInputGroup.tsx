import { FunctionComponent, useMemo, type CSSProperties } from "react";

export type UserInputGroupType = {
  className?: string;
  usernameEmail?: string;
  usernamegmailcomPlacehold?: string;

  /** Style props */
  propTop?: CSSProperties["top"];
};

const UserInputGroup: FunctionComponent<UserInputGroupType> = ({
  className = "",
  usernameEmail,
  usernamegmailcomPlacehold,
  propTop,
}) => {
  const usernameGroupStyle: CSSProperties = useMemo(() => {
    return {
      top: propTop,
    };
  }, [propTop]);

  return (
    <div
      className={`absolute top-[0px] left-[calc(50%_-_185px)] w-[370px] h-[86px] text-left text-5xl text-dimgray font-jaldi ${className}`}
      style={usernameGroupStyle}
    >
      <input
        className="[border:none] [outline:none] bg-linen-200 absolute top-[36px] left-[calc(50%_-_185px)] shadow-[2px_2px_10px_rgba(0,_0,_0,_0.1)_inset] rounded-3xs w-[370px] h-[50px]"
        type="text"
      />
      <div className="absolute top-[0px] left-[0px]">{usernameEmail}</div>
      <input
        className="[border:none] [outline:none] font-caption-2 text-xl bg-[transparent] absolute top-[49px] left-[15px] text-black text-left flex items-center w-[338px]"
        placeholder={usernamegmailcomPlacehold}
        type="email"
      />
    </div>
  );
};

export default UserInputGroup;
